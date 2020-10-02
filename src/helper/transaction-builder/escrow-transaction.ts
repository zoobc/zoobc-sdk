import { writeInt32, writeInt64 } from '../utils';
import { ADDRESS_LENGTH, VERSION } from './constant';
import { BIP32Interface } from 'bip32';

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
  const addressLength = writeInt32(ADDRESS_LENGTH);
  const recepient = new Buffer(ADDRESS_LENGTH);
  const fee = writeInt64(data.fee * 1e8);
  const approvalCode = writeInt32(data.approvalCode);
  const transactionId = writeInt64(data.transactionId);
  const bodyLength = writeInt32(approvalCode.length + transactionId.length);

  bytes = Buffer.concat([
    TRANSACTION_TYPE,
    VERSION,
    timestamp,
    addressLength,
    approvalAddress,
    addressLength,
    recepient,
    fee,
    bodyLength,
    approvalCode,
    transactionId,
  ]);

  // ========== NULLIFYING THE ESCROW ===========
  const approverAddressLength = writeInt32(0);
  const commission = writeInt64(0);
  const timeout = writeInt64(0);
  const instructionLength = writeInt32(0);

  bytes = Buffer.concat([bytes, approverAddressLength, commission, timeout, instructionLength]);
  // ========== END NULLIFYING THE ESCROW =========

  if (seed) {
    const signatureType = writeInt32(0);
    const signature = seed.sign(bytes);
    const bodyLengthSignature = writeInt32(signatureType.length + signature.length);
    return Buffer.concat([bytes, bodyLengthSignature, signatureType, signature]);
  } else return bytes;
}
