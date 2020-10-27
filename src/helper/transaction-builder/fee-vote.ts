import { writeInt64, writeInt32, ZBCAddressToBytes, accountToBytes } from '../utils';
import { VERSION } from './constant';
import { BIP32Interface } from 'bip32';
import { sha3_256 } from 'js-sha3';
import { generateTransactionHash } from '../wallet/MultiSignature';
import { EscrowTransactionInterface } from './send-money';
import { Account } from '../interfaces';
import { TransactionType } from '../../../grpc/model/transaction_pb';
import { AccountType } from '../../../grpc/model/accountType_pb';
import { addEscrowBytes } from './escrow-transaction';

const TRANSACTION_TYPE_FEE_VOTE_COMMIT = writeInt32(TransactionType.FEEVOTECOMMITMENTVOTETRANSACTION);
const TRANSACTION_TYPE_FEE_VOTE_REVEAL = writeInt32(TransactionType.FEEVOTEREVEALVOTETRANSACTION);

export interface feeVoteInterface extends EscrowTransactionInterface {
  accountAddress: Account;
  fee: number;
  recentBlockHash: string;
  recentBlockHeight: number;
  feeVote: number;
}

export function feeVoteCommitBuilder(data: feeVoteInterface, seed: BIP32Interface) {
  let bytes: Buffer;

  const timestamp = writeInt64(Math.trunc(Date.now() / 1000));
  const sender = accountToBytes(data.accountAddress);
  const recipient = writeInt32(AccountType.EMPTYACCOUNTTYPE);
  const fee = writeInt64(data.fee * 1e8);

  const recentBlockHash = Buffer.from(data.recentBlockHash.toString(), 'base64');
  const recentBlockHeight = writeInt32(data.recentBlockHeight);
  const feeVote = writeInt64(data.feeVote * 1e8);
  const bytesFeeVote = Buffer.concat([recentBlockHash, recentBlockHeight, feeVote]);
  const hashed = Buffer.from(sha3_256(bytesFeeVote), 'hex');
  const bodyLength = writeInt32(hashed.length);

  bytes = Buffer.concat([TRANSACTION_TYPE_FEE_VOTE_COMMIT, VERSION, timestamp, sender, recipient, fee, bodyLength, hashed]);

  // Add Escrow Bytes
  bytes = addEscrowBytes(bytes, data);

  const message = writeInt32(0);
  bytes = Buffer.concat([bytes, message]);

  const txHash = ZBCAddressToBytes(generateTransactionHash(bytes));
  const signature = seed.sign(txHash);
  return Buffer.concat([bytes, signature]);
}

export function feeVoteRevealBuilder(data: feeVoteInterface, seed: BIP32Interface) {
  let bytes: Buffer;

  const timestamp = writeInt64(Math.trunc(Date.now() / 1000));
  const sender = accountToBytes(data.accountAddress);
  const recipient = writeInt32(AccountType.EMPTYACCOUNTTYPE);
  const fee = writeInt64(data.fee * 1e8);

  const recentBlockHash = Buffer.from(data.recentBlockHash.toString(), 'base64');
  const recentBlockHeight = writeInt32(data.recentBlockHeight);
  const feeVote = writeInt64(data.feeVote * 1e8);
  const feeVoteInfoBytes = Buffer.concat([recentBlockHash, recentBlockHeight, feeVote]);
  const signFeeVote = seed.sign(feeVoteInfoBytes);
  const voteSignature = Buffer.concat([signFeeVote]);
  const voteSignatureLength = writeInt32(voteSignature.length);
  const bodyLength = writeInt32(
    recentBlockHash.length + recentBlockHeight.length + feeVote.length + voteSignatureLength.length + voteSignature.length,
  );

  bytes = Buffer.concat([
    TRANSACTION_TYPE_FEE_VOTE_REVEAL,
    VERSION,
    timestamp,
    sender,
    recipient,
    fee,
    bodyLength,
    recentBlockHash,
    recentBlockHeight,
    feeVote,
    voteSignatureLength,
    voteSignature,
  ]);

  // Add Escrow Bytes
  bytes = addEscrowBytes(bytes, data);

  const message = writeInt32(0);
  bytes = Buffer.concat([bytes, message]);

  const txHash = ZBCAddressToBytes(generateTransactionHash(bytes));
  const signature = seed.sign(txHash);
  return Buffer.concat([bytes, signature]);
}
