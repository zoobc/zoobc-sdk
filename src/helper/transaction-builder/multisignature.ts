import { BIP32Interface } from 'bip32';
import { AccountType } from '../../../grpc/model/accountType_pb';
import { TransactionType } from '../../../grpc/model/transaction_pb';
import { Address } from '../interfaces';
import { writeInt64, writeInt32, ZBCAddressToBytes, addressToBytes } from '../utils';
import { generateTransactionHash } from '../wallet/MultiSignature';
import { VERSION } from './constant';
import { addEscrowBytes } from './escrow-transaction';
import { EscrowTransactionInterface } from './send-money';

const TRANSACTION_TYPE = writeInt32(TransactionType.MULTISIGNATURETRANSACTION);

export interface MultiSigInterface extends EscrowTransactionInterface {
  accountAddress: Address;
  fee: number;
  multisigInfo?: MultiSigInfo;
  unisgnedTransactions?: Buffer;
  signaturesInfo?: SignatureInfo;
}

export interface MultiSigInfo {
  participants: Address[];
  nonce: number;
  minSigs: number;
}

export interface SignatureInfo {
  txHash: string;
  participants: {
    address: Address;
    signature: Buffer;
  }[];
}

export function multisignatureBuilder(data: MultiSigInterface, seed?: BIP32Interface): Buffer {
  const { multisigInfo, unisgnedTransactions, signaturesInfo } = data;
  let bytes: Buffer;

  const timestamp = writeInt64(Math.trunc(Date.now() / 1000));
  const sender = addressToBytes(data.accountAddress);
  const recipient = writeInt32(AccountType.EMPTYACCOUNTTYPE);
  const fee = writeInt64(data.fee * 1e8);

  // MULTISIG INFO
  let multisigInfoBytes = writeInt32(0);
  if (multisigInfo) {
    const multisigPresent = writeInt32(1);
    const minSign = writeInt32(multisigInfo.minSigs);
    const nonce = writeInt64(multisigInfo.nonce);

    let participants = Buffer.from([]);
    multisigInfo.participants.forEach(participant => {
      const address = addressToBytes(participant);
      participants = Buffer.concat([participants, address]);
    });

    const totalParticipants = writeInt32(multisigInfo.participants.length);

    multisigInfoBytes = Buffer.concat([multisigPresent, minSign, nonce, totalParticipants, participants]);
  }

  // UNSIGNED TRANSACTIONS
  let transactionBytes = writeInt32(0);
  if (unisgnedTransactions) {
    const txBytesLen = writeInt32(unisgnedTransactions.length);
    transactionBytes = Buffer.concat([txBytesLen, unisgnedTransactions]);
  }

  // SIGNATURES INFO
  let signaturesInfoBytes = writeInt32(0);
  if (signaturesInfo) {
    const signatureInfoPresent = writeInt32(1);
    const txHash = ZBCAddressToBytes(signaturesInfo.txHash);
    const totalParticipants = writeInt32(signaturesInfo.participants.length);

    let participants = Buffer.from([]);
    signaturesInfo.participants.forEach(participant => {
      const address = addressToBytes(participant.address);
      const signatureLen = writeInt32(participant.signature.length);
      participants = Buffer.concat([participants, address, signatureLen, participant.signature]);
    });

    signaturesInfoBytes = Buffer.concat([signatureInfoPresent, txHash, totalParticipants, participants]);
  }

  const bodyLength = writeInt32(multisigInfoBytes.length + transactionBytes.length + signaturesInfoBytes.length);

  bytes = Buffer.concat([
    TRANSACTION_TYPE,
    VERSION,
    timestamp,
    sender,
    recipient,
    fee,
    bodyLength,
    multisigInfoBytes,
    transactionBytes,
    signaturesInfoBytes,
  ]);

  // Add Escrow Bytes
  bytes = addEscrowBytes(bytes, data);

  const message = writeInt32(0);
  bytes = Buffer.concat([bytes, message]);

  if (seed) {
    const txHash = ZBCAddressToBytes(generateTransactionHash(bytes));
    const signature = seed.sign(txHash);
    return Buffer.concat([bytes, signature]);
  } else return bytes;
}

export function signTransactionHash(txHash: string, seed: BIP32Interface) {
  const txHashBytes = ZBCAddressToBytes(txHash);
  return seed.sign(txHashBytes);
}
