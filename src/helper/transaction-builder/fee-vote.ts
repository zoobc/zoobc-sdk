import { writeInt64, writeInt32, getZBCAddress, ZBCAddressToBytes } from '../utils';
import { ADDRESS_LENGTH, VERSION } from './constant';
import { BIP32Interface } from 'bip32';
import { sha3_256 } from 'js-sha3';
import { generateTransactionHash } from '../wallet/MultiSignature';

const TRANSACTION_TYPE_FEE_VOTE_COMMIT = new Buffer([7, 0, 0, 0]);
const TRANSACTION_TYPE_FEE_VOTE_REVEAL = new Buffer([7, 1, 0, 0]);

export interface feeVoteInterface {
  accountAddress: string;
  fee: number;
  recentBlockHash: string;
  recentBlockHeight: number;
  feeVote: number;
}

export function feeVoteCommitBuilder(data: feeVoteInterface, seed: BIP32Interface) {
  let bytes: Buffer;

  const timestamp = writeInt64(Math.trunc(Date.now() / 1000));
  const accountAddress = Buffer.from(data.accountAddress, 'utf-8');
  const recipient = new Buffer(ADDRESS_LENGTH);
  const addressLength = writeInt32(ADDRESS_LENGTH);
  const fee = writeInt64(data.fee * 1e8);

  const recentBlockHash = Buffer.from(data.recentBlockHash.toString(), 'base64');
  const recentBlockHeight = writeInt32(data.recentBlockHeight);
  const feeVote = writeInt64(data.feeVote * 1e8);
  const bytesFeeVote = Buffer.concat([recentBlockHash, recentBlockHeight, feeVote]);
  const hashed = Buffer.from(sha3_256(bytesFeeVote), 'hex');
  const bodyLength = writeInt32(hashed.length);

  bytes = Buffer.concat([
    TRANSACTION_TYPE_FEE_VOTE_COMMIT,
    VERSION,
    timestamp,
    addressLength,
    accountAddress,
    addressLength,
    recipient,
    fee,
    bodyLength,
    hashed,
  ]);

  // ========== NULLIFYING THE ESCROW ===========
  const approverAddressLength = writeInt32(0);
  const commission = writeInt64(0);
  const timeout = writeInt64(0);
  const instructionLength = writeInt32(0);

  bytes = Buffer.concat([bytes, approverAddressLength, commission, timeout, instructionLength]);
  // ========== END NULLIFYING THE ESCROW =========

  const signatureType = writeInt32(0);
  const signature = seed.sign(bytes);
  const bodyLengthSignature = writeInt32(signatureType.length + signature.length);
  return Buffer.concat([bytes, bodyLengthSignature, signatureType, signature]);
}

export function feeVoteRevealBuilder(data: feeVoteInterface, seed: BIP32Interface) {
  let bytes: Buffer;

  const timestamp = writeInt64(Math.trunc(Date.now() / 1000));
  const accountAddress = Buffer.from(data.accountAddress, 'utf-8');
  const recipient = new Buffer(ADDRESS_LENGTH);
  const addressLength = writeInt32(ADDRESS_LENGTH);
  const fee = writeInt64(data.fee * 1e8);

  const recentBlockHash = Buffer.from(data.recentBlockHash.toString(), 'base64');
  const recentBlockHeight = writeInt32(data.recentBlockHeight);
  const feeVote = writeInt64(data.feeVote * 1e8);
  const feeVoteInfoBytes = Buffer.concat([recentBlockHash, recentBlockHeight, feeVote]);
  const signTypeFeeVote = writeInt32(0);
  const signFeeVote = seed.sign(feeVoteInfoBytes);
  const voteSignature = Buffer.concat([signTypeFeeVote, signFeeVote]);
  const voteSignatureLength = writeInt32(voteSignature.length);
  const bodyLength = writeInt32(
    recentBlockHash.length + recentBlockHeight.length + feeVote.length + voteSignatureLength.length + voteSignature.length,
  );

  bytes = Buffer.concat([
    TRANSACTION_TYPE_FEE_VOTE_REVEAL,
    VERSION,
    timestamp,
    addressLength,
    accountAddress,
    addressLength,
    recipient,
    fee,
    bodyLength,
    recentBlockHash,
    recentBlockHeight,
    feeVote,
    voteSignatureLength,
    voteSignature,
  ]);

  // ========== NULLIFYING THE ESCROW ===========
  const approverAddressLength = writeInt32(0);
  const commission = writeInt64(0);
  const timeout = writeInt64(0);
  const instructionLength = writeInt32(0);

  bytes = Buffer.concat([bytes, approverAddressLength, commission, timeout, instructionLength]);
  // ========== END NULLIFYING THE ESCROW =========

  const signatureType = writeInt32(0);
  const txFormat = generateTransactionHash(bytes);
  const txBytes = ZBCAddressToBytes(txFormat)
  const signature = seed.sign(txBytes);
  const bodyLengthSignature = writeInt32(signatureType.length + signature.length);
  return Buffer.concat([bytes, bodyLengthSignature, signatureType, signature]);
}
