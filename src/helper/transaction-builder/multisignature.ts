import { BIP32Interface } from 'bip32';
import { writeInt64, writeInt32, getZBCAddress, readInt64 } from '../utils';
import { ADDRESS_LENGTH, VERSION } from './constant';
import { base64ToBuffer } from '../converters';
import { TransactionType } from '../..';
import { readClaimNodeBytes } from './claim-node';
import { readNodeRegistrationBytes } from './register-node';
import { readRemoveNodeRegistrationBytes } from './remove-node';
import { readPostTransactionBytes, readSendMoneyBytes, readSendMoneyEscrowBytes } from './send-money';
import { readSetupAccountDatasetBytes } from './setup-account-dataset';
import { readUpdateNodeBytes } from './update-node';

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

export function multisignatureBuilder(data: MultiSigInterface, seed?: BIP32Interface): Buffer {
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

  if (seed) {
    const signatureType = writeInt32(0);
    const signature = seed.sign(bytes);
    const bodyLengthSignature = writeInt32(signatureType.length + signature.length);
    return Buffer.concat([bytes, bodyLengthSignature, signatureType, signature]);
  } else return bytes;
}

export function signTransactionHash(txHash: string, seed: BIP32Interface) {
  const signatureType = writeInt32(0);
  const txHashBytes = base64ToBuffer(txHash);
  const signature = seed.sign(txHashBytes);
  return Buffer.concat([signatureType, signature]);
}

export function readMultisignatureTransactionBytes(txBytes: Buffer, bytesConverted: any) {
  const length32 = 4;
  const length64 = 8;
  const lengthHash = 32;
  const bodyMultisignatureTransactionLength = txBytes.slice(161, 165).readInt32LE(0);
  const bodyMultisignatureTransaction = txBytes.slice(165, 165 + bodyMultisignatureTransactionLength);
  const MultisigInfoFieldPresent = bodyMultisignatureTransaction.slice(0, length32).readInt32LE(0);
  const minsign = bodyMultisignatureTransaction.slice(length32, length64).readInt32LE(0);
  const endNonceLength = length64 + length64;
  const nonce = bodyMultisignatureTransaction.slice(length64, endNonceLength);
  const endTotParticipant = length64 + length64 + length32;
  const totParticipant = bodyMultisignatureTransaction.slice(endNonceLength, endTotParticipant).readInt32LE(0);
  const lengthBytesParticipant = totParticipant * 70;
  const endParticipant = endTotParticipant + lengthBytesParticipant;
  const participant = bodyMultisignatureTransaction.slice(endTotParticipant, endParticipant);
  let eachParticipant = [];
  for (let i = 0; i < participant.length; i += 70) {
    const sliceParticipant = participant.slice(i, i + 70);
    const address = sliceParticipant.slice(4, 70);
    eachParticipant.push(address.toString());
  }
  const endTxBytesLength = endParticipant + length32;
  const txByteslength = bodyMultisignatureTransaction.slice(endParticipant, endTxBytesLength).readInt32LE(0);
  const endTxBytesUnsign = endTxBytesLength + txByteslength;
  bytesConverted.bodyBytes = {
    multisiginfo: {
      minimumSignatures: minsign,
      nonce: readInt64(nonce, 0),
      participantCount: totParticipant,
      participants: eachParticipant,
    },
  };
  if (txByteslength > 0) {
    const txBytesUnsign = bodyMultisignatureTransaction.slice(endTxBytesLength, endTxBytesUnsign);
    const transactionType = txBytesUnsign.slice(0, 4).readInt32LE(0);
    let multisigTx;
    multisigTx = readPostTransactionBytes(txBytesUnsign);
    switch (transactionType) {
      case TransactionType.UPDATENODEREGISTRATIONTRANSACTION:
        multisigTx.multisigTxType = 'Update Node';
        multisigTx = readUpdateNodeBytes(txBytesUnsign, multisigTx);
        break;
      case TransactionType.SENDMONEYTRANSACTION:
        multisigTx.multisigTxType = 'Send Money';
        multisigTx = readSendMoneyBytes(txBytesUnsign, multisigTx);
        if (txBytesUnsign.length > 269) {
          multisigTx = readSendMoneyEscrowBytes(txBytesUnsign, multisigTx);
          break;
        }
        break;
      case TransactionType.REMOVENODEREGISTRATIONTRANSACTION:
        multisigTx.multisigTxType = 'Remove Node';
        multisigTx = readRemoveNodeRegistrationBytes(txBytesUnsign, multisigTx);
        break;
      case TransactionType.NODEREGISTRATIONTRANSACTION:
        multisigTx.multisigTxType = 'Node Registration';
        multisigTx = readNodeRegistrationBytes(txBytesUnsign, multisigTx);
        break;
      case TransactionType.CLAIMNODEREGISTRATIONTRANSACTION:
        multisigTx.multisigTxType = 'Claim Node';
        multisigTx = readClaimNodeBytes(txBytesUnsign, multisigTx);
        break;
      case TransactionType.SETUPACCOUNTDATASETTRANSACTION:
        multisigTx.multisigTxType = 'Setup Account Dataset';
        multisigTx = readSetupAccountDatasetBytes(txBytesUnsign, multisigTx);
        break;
      case TransactionType.REMOVEACCOUNTDATASETTRANSACTION:
        multisigTx.multisigTxType = 'Remove Account Dataset';
        multisigTx = readRemoveNodeRegistrationBytes(txBytesUnsign, multisigTx);
        break;
    }
    bytesConverted.bodyBytes.transactionbytes = multisigTx;
  }
  const endSignPresentLength = endTxBytesUnsign + length32;
  const signPresent = bodyMultisignatureTransaction.slice(endTxBytesUnsign, endSignPresentLength).readInt32LE(0);
  if (signPresent) {
    const endTxHashLength = endSignPresentLength + lengthHash;
    const txHash = bodyMultisignatureTransaction.slice(endSignPresentLength, endTxHashLength);
    const endPartSignLength = endTxHashLength + length32;
    const totalPartSign = bodyMultisignatureTransaction.slice(endTxHashLength, endPartSignLength).readInt32LE(0);
    const lengthBytesParticipantSign = totalPartSign * 142;
    const endpartSignBytesLength = endPartSignLength + lengthBytesParticipantSign;
    const partSign = bodyMultisignatureTransaction.slice(endPartSignLength, endpartSignBytesLength);
    let eachParticipantSigned = [];
    for (let i = 0; i < partSign.length; i += 142) {
      const sliceParticipant = partSign.slice(i, i + 142);
      const address = sliceParticipant.slice(4, 70);
      const signByte = sliceParticipant.slice(74, 142);
      eachParticipantSigned.push({ address: address.toString(), signBytes: signByte });
    }
    bytesConverted.bodyBytes.signatureInfo = {
      txHash: getZBCAddress(txHash, 'ZTX'),
      signatureCount: totalPartSign,
      signatures: eachParticipantSigned,
    };
  }
  return bytesConverted;
}
