import { writeInt64, writeInt32, getZBCAddress } from '../utils';
import { ADDRESS_LENGTH, VERSION } from './constant';
import { BIP32Interface } from 'bip32';

const TRANSACTION_TYPE = new Buffer([2, 3, 0, 0]);

export interface ClaimNodeInterface {
  accountAddress: string;
  fee: number;
  nodePublicKey: Buffer;
  nodeAddress: string;
}

export function claimNodeBuilder(data: ClaimNodeInterface, poown: Buffer, seed?: BIP32Interface) {
  let bytes: Buffer;

  const timestamp = writeInt64(Math.trunc(Date.now() / 1000));
  const accountAddress = Buffer.from(data.accountAddress, 'utf-8');
  const recipient = new Buffer(ADDRESS_LENGTH);
  const addressLength = writeInt32(ADDRESS_LENGTH);
  const fee = writeInt64(data.fee * 1e8);

  const nodePublicKey = data.nodePublicKey;
  const bodyLength = writeInt32(nodePublicKey.length + poown.length);

  bytes = Buffer.concat([
    TRANSACTION_TYPE,
    VERSION,
    timestamp,
    addressLength,
    accountAddress,
    addressLength,
    recipient,
    fee,
    bodyLength,
    nodePublicKey,
    poown,
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

export function readClaimNodeBytes(txBytes: Buffer) {
  const bodyBytesClaimNodeLength = txBytes.slice(161, 165).readInt32LE(0);
  const bodyBytesClaim = txBytes.slice(165, 165 + bodyBytesClaimNodeLength);
  const pubkeyClaim = bodyBytesClaim.slice(0, 32);
  const pownClaim = bodyBytesClaim.slice(32, 198);
  const txBody = {
    pubkey: getZBCAddress(pubkeyClaim, 'ZNK'),
    pown: pownClaim,
  };
  return txBody;
}
