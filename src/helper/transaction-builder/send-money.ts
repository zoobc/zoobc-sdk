// Licensed to the Quasisoft Limited - Hong Kong under one or more agreements
// The Quasisoft Limited - Hong Kong licenses this file to you under MIT license.

import { addressToBytes, generateTransactionHash, readInt64, writeInt32, writeInt64, ZBCAddressToBytes } from '../utils';
import { VERSION } from './constant';
import { BIP32Interface } from 'bip32';
import { TransactionType } from '../../../grpc/model/transaction_pb';
import { Address } from '../interfaces';
import { addEscrowBytes } from './escrow-transaction';
import { addLiquidBytes } from './liquid-transaction';

const TRANSACTION_TYPE = writeInt32(TransactionType.SENDZBCTRANSACTION);

export interface SendZBCInterface extends EscrowTransactionInterface {
  sender: Address;
  recipient: Address;
  fee: number;
  message?: string;
  amount: number;
}

export interface EscrowTransactionInterface {
  approverAddress?: Address;
  commission?: number;
  timeout?: number;
  instruction?: string;
}

export function SendZBCBuilder(data: SendZBCInterface, seed?: BIP32Interface): Buffer {
  let bytes: Buffer;

  const timestamp = writeInt64(Math.trunc(Date.now() / 1000));
  const sender = addressToBytes(data.sender);
  const recipient = addressToBytes(data.recipient);
  const fee = writeInt64(data.fee * 1e8);
  const amount = writeInt64(data.amount * 1e8);
  const bodyLength = writeInt32(amount.length);

  bytes = Buffer.concat([TRANSACTION_TYPE, VERSION, timestamp, sender, recipient, fee, bodyLength, amount]);

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

export function readSendZBCBytes(txBytes: Buffer, offset: number): any {
  const amount = parseInt(readInt64(txBytes, offset));
  return { amount };
}
