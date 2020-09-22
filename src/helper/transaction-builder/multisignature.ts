import { BIP32Interface } from 'bip32';
import { writeInt64, writeInt32 } from '../utils';
import { ADDRESS_LENGTH, VERSION } from './constant';
import { base64ToBuffer } from '../converters';

const TRANSACTION_TYPE = new Buffer([5, 0, 0, 0]);

export interface MultiSigInterface {
  accountAddress: string;
  fee: number;
  multisigInfo?: MultiSigInfo;
  unisgnedTransactions?: Buffer;
  signaturesInfo?: SignatureInfo;
}

export interface MultiSigAddress {
  participants: string[];
  nonce: number;
  minSigs: number;
}

export interface MultiSigInfo {
  participants: string[];
  nonce: number;
  minSigs: number;
}

export interface SignatureInfo {
  txHash: string;
  participants: {
    address: string;
    signature: Buffer;
  }[];
}

export function multisignatureBuilder(data: MultiSigInterface, seed: BIP32Interface): Buffer {
  const { multisigInfo, unisgnedTransactions, signaturesInfo } = data;
  let bytes: Buffer;

  const timestamp = writeInt64(Math.trunc(Date.now() / 1000));
  const accountAddress = Buffer.from(data.accountAddress, 'utf-8');
  const recipient = new Buffer(ADDRESS_LENGTH);
  const addressLength = writeInt32(ADDRESS_LENGTH);
  const fee = writeInt64(data.fee * 1e8);

  // MULTISIG INFO
  let multisigInfoBytes = writeInt32(0);
  if (multisigInfo) {
    const multisigPresent = writeInt32(1);
    const minSign = writeInt32(multisigInfo.minSigs);
    const nonce = writeInt64(multisigInfo.nonce);

    let participants = Buffer.from([]);
    multisigInfo.participants.forEach(participant => {
      const address = Buffer.from(participant, 'utf-8');
      participants = Buffer.concat([participants, addressLength, address]);
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
    const txHash = base64ToBuffer(signaturesInfo.txHash);
    const totalParticipants = writeInt32(signaturesInfo.participants.length);

    let participants = Buffer.from([]);
    signaturesInfo.participants.forEach(participant => {
      const address = Buffer.from(participant.address, 'utf-8');
      const signatureLen = writeInt32(participant.signature.length);
      participants = Buffer.concat([participants, addressLength, address, signatureLen, participant.signature]);
    });

    signaturesInfoBytes = Buffer.concat([signatureInfoPresent, txHash, totalParticipants, participants]);
  }

  const bodyLength = writeInt32(multisigInfoBytes.length + transactionBytes.length + signaturesInfoBytes.length);

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
    multisigInfoBytes,
    transactionBytes,
    signaturesInfoBytes,
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

export function signTransactionHash(txHash: string, seed: BIP32Interface) {
  const signatureType = writeInt32(0);
  const txHashBytes = base64ToBuffer(txHash);
  const signature = seed.sign(txHashBytes);
  return Buffer.concat([signatureType, signature]);
}
