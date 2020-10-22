import { readInt64, writeInt32, writeInt64, ZBCAddressToBytes } from '../utils';
import { ADDRESS_LENGTH, VERSION } from './constant';
import { BIP32Interface } from 'bip32';
import { generateTransactionHash } from '../wallet/MultiSignature';

const TRANSACTION_TYPE = new Buffer([4, 0, 0, 0]);

export interface EscrowApprovalInterface {
  approvalAddress: string;
  fee: number;
  approvalCode: number;
  transactionId: string;
}

export function escrowBuilder(data: EscrowApprovalInterface, seed?: BIP32Interface): Buffer {
  let bytes: Buffer;
  const timestamp = writeInt64(Math.trunc(Date.now() / 1000));
  const approvalAddress = Buffer.from(data.approvalAddress, 'utf-8');
  const addressType = writeInt32(0);
  const recepient = new Buffer(ADDRESS_LENGTH);
  const fee = writeInt64(data.fee * 1e8);
  const approvalCode = writeInt32(data.approvalCode);
  const transactionId = writeInt64(data.transactionId);
  const bodyLength = writeInt32(approvalCode.length + transactionId.length);

  bytes = Buffer.concat([
    TRANSACTION_TYPE,
    VERSION,
    timestamp,
    addressType,
    approvalAddress,
    addressType,
    recepient,
    fee,
    bodyLength,
    approvalCode,
    transactionId,
  ]);

  // ========== NULLIFYING THE ESCROW ===========
  const commission = writeInt64(0);
  const timeout = writeInt64(0);
  const instructionLength = writeInt32(0);

  bytes = Buffer.concat([bytes, addressType, commission, timeout, instructionLength]);
  // ========== END NULLIFYING THE ESCROW =========

  if (seed) {
    const txFormat = generateTransactionHash(bytes);
    const txBytes = ZBCAddressToBytes(txFormat);
    const signature = seed.sign(txBytes);
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
