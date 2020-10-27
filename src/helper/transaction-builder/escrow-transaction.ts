import { accountToBytes, hasEscrowTransaction, readInt64, writeInt32, writeInt64, ZBCAddressToBytes } from '../utils';
import { VERSION } from './constant';
import { BIP32Interface } from 'bip32';
import { generateTransactionHash } from '../wallet/MultiSignature';
import { EscrowTransactionInterface } from './send-money';
import { Account } from '../interfaces';

const TRANSACTION_TYPE = new Buffer([4, 0, 0, 0]);

export interface EscrowApprovalInterface extends EscrowTransactionInterface {
  approvalAddress: Account;
  fee: number;
  approvalCode: number;
  transactionId: string;
}

export function escrowBuilder(data: EscrowApprovalInterface, seed?: BIP32Interface): Buffer {
  let bytes: Buffer;
  const timestamp = writeInt64(Math.trunc(Date.now() / 1000));
  const approvalAddress = accountToBytes(data.approvalAddress);
  const recepient = writeInt32(2);
  const fee = writeInt64(data.fee * 1e8);
  const approvalCode = writeInt32(data.approvalCode);
  const transactionId = writeInt64(data.transactionId);
  const bodyLength = writeInt32(approvalCode.length + transactionId.length);

  bytes = Buffer.concat([TRANSACTION_TYPE, VERSION, timestamp, approvalAddress, recepient, fee, bodyLength, approvalCode, transactionId]);

  if (data.approverAddress && data.commission && data.timeout && data.instruction) {
    // escrow bytes
    bytes = hasEscrowTransaction(bytes, data);
  } else {
    // escrow bytes default value
    const approverAddress = writeInt32(2);
    bytes = Buffer.concat([bytes, approverAddress]);
  }

  const message = writeInt32(0);
  bytes = Buffer.concat([bytes, message]);

  if (seed) {
    const txHash = ZBCAddressToBytes(generateTransactionHash(bytes));
    const signature = seed.sign(txHash);
    return Buffer.concat([bytes, signature]);
  } else return bytes;
}

export function readApprovalEscrowBytes(txBytes: Buffer) {
  const bodyApprovalEscrowLength = txBytes.slice(161, 165).readInt32LE(0);
  const bodyApprovalEscrow = txBytes.slice(165, 165 + bodyApprovalEscrowLength);
  const approvalCode = bodyApprovalEscrow.slice(0, 4).readInt32LE(0);
  const txId = readInt64(bodyApprovalEscrow.slice(4, 12), 0);
  const txBody = {
    approval: approvalCode,
    transactionid: txId,
  };
  return txBody;
}
