// Licensed to the Quasisoft Limited - Hong Kong under one or more agreements
// The Quasisoft Limited - Hong Kong licenses this file to you under MIT license.

import { addressToBytes, generateTransactionHash, readInt64, writeInt32, writeInt64, ZBCAddressToBytes } from '../utils';
import { VERSION } from './constant';
import { BIP32Interface } from 'bip32';
import { EscrowTransactionInterface } from './send-money';
import { Address } from '../interfaces';
import { TransactionType } from '../../../grpc/model/transaction_pb';
import { AccountType } from '../../../grpc/model/accountType_pb';

const TRANSACTION_TYPE = writeInt32(TransactionType.APPROVALESCROWTRANSACTION);

export interface EscrowApprovalInterface extends EscrowTransactionInterface {
  approvalAddress: Address;
  fee: number;
  approvalCode: number;
  transactionId: string;
  message?: string;
}

export function escrowBuilder(data: EscrowApprovalInterface, seed?: BIP32Interface): Buffer {
  let bytes: Buffer;
  const timestamp = writeInt64(Math.trunc(Date.now() / 1000));
  const approvalAddress = addressToBytes(data.approvalAddress);
  const recipient = writeInt32(AccountType.EMPTYACCOUNTTYPE);
  const fee = writeInt64(data.fee * 1e8);
  const approvalCode = writeInt32(data.approvalCode);
  const transactionId = writeInt64(data.transactionId);
  const bodyLength = writeInt32(approvalCode.length + transactionId.length);

  bytes = Buffer.concat([TRANSACTION_TYPE, VERSION, timestamp, approvalAddress, recipient, fee, bodyLength, approvalCode, transactionId]);

  // Add Escrow Bytes
  bytes = addEscrowBytes(bytes, data);

  // Add message
  let message = writeInt32(0);
  if (data.message) {
    message = writeInt32(data.message.length);
    message = Buffer.concat([message, Buffer.from(data.message)]);
  }

  bytes = Buffer.concat([bytes, message]);

  if (seed) {
    const txHash = ZBCAddressToBytes(generateTransactionHash(bytes));
    const signature = seed.sign(txHash);
    return Buffer.concat([bytes, signature]);
  } else return bytes;
}

export function readApprovalEscrowBytes(txBytes: Buffer, offset: number) {
  const approval = txBytes.readInt32LE(offset);
  offset += 4;

  const transactionid = readInt64(txBytes, offset);
  return { approval, transactionid };
}

export function addEscrowBytes(bytes: Buffer, data: any): Buffer {
  if (data.approverAddress && data.commission && data.timeout && data.instruction) {
    // escrow bytes
    const approverAddress = addressToBytes(data.approverAddress);
    const commission = writeInt64(data.commission * 1e8);
    const timeout = writeInt64(data.timeout);
    const instruction = Buffer.from(data.instruction, 'utf-8');
    const instructionLength = writeInt32(instruction.length);
    bytes = Buffer.concat([bytes, approverAddress, commission, timeout, instructionLength, instruction]);
  } else {
    // escrow bytes default value
    const approverAddress = writeInt32(AccountType.EMPTYACCOUNTTYPE);
    bytes = Buffer.concat([bytes, approverAddress]);
  }
  return bytes;
}
