import * as CryptoJS from 'crypto-js';
import SHA3 from 'sha3';
import B32Enc from 'base32-encode';
import B32Dec from 'base32-decode';
import { Int64LE } from 'int64-buffer';
import zoobc from '..';
import { TransactionType } from '../../grpc/model/transaction_pb';

export const errorDateMessage = {
  code: '',
  message: 'please fix your date and time',
  metadata: '',
};

// getAddressFromPublicKey Get the formatted address from a raw public key
export function getZBCAddress(publicKey: Uint8Array, prefix: string = 'ZBC'): string {
  const prefixDefault = ['ZBC', 'ZNK', 'ZBL', 'ZTX'];
  const valid = prefixDefault.indexOf(prefix) > -1;
  if (valid) {
    const bytes = Buffer.alloc(35);
    for (let i = 0; i < 32; i++) bytes[i] = publicKey[i];
    for (let i = 0; i < 3; i++) bytes[i + 32] = prefix.charCodeAt(i);
    const checksum = hash(bytes);
    for (let i = 0; i < 3; i++) bytes[i + 32] = Number(checksum[i]);
    const segs = [prefix];
    const b32 = B32Enc(bytes, 'RFC4648');
    for (let i = 0; i < 7; i++) segs.push(b32.substr(i * 8, 8));

    return segs.join('_');
  } else {
    throw new Error('The Prefix not available!');
  }
}

export function hash(str: any, format: string = 'buffer') {
  const h = new SHA3(256);
  h.update(str);
  const b = h.digest();
  if (format == 'buffer') return b;
  return b.toString(format);
}

export function encryptPassword(password: string, salt: string = 'salt'): string {
  return CryptoJS.PBKDF2(password, salt, {
    keySize: 8,
    iterations: 10000,
  }).toString();
}

export function isZBCAddressValid(address: string, stdPrefix: string = 'ZBC'): boolean {
  if (address.length != 66) return false;
  const segs = address.split('_');
  const prefix = segs[0];
  if (prefix != stdPrefix) return false;
  segs.shift();
  if (segs.length != 7) return false;
  for (let i = 0; i < segs.length; i++) if (!/[A-Z2-7]{8}/.test(segs[i])) return false;
  const b32 = segs.join('');
  const buffer = Buffer.from(B32Dec(b32, 'RFC4648'));
  const inputChecksum = [];
  for (let i = 0; i < 3; i++) inputChecksum.push(buffer[i + 32]);
  for (let i = 0; i < 3; i++) buffer[i + 32] = prefix.charCodeAt(i);
  const checksum = hash(buffer);
  for (let i = 0; i < 3; i++) if (checksum[i] != inputChecksum[i]) return false;
  return true;
}

export function ZBCAddressToBytes(address: string): Buffer {
  const segs = address.split('_');
  segs.shift();
  const b32 = segs.join('');
  const buffer = Buffer.from(B32Dec(b32, 'RFC4648'));
  return buffer.slice(0, 32);
}

export function shortenHash(text = ''): string {
  if (!text) return text;

  const split = text.split('_');
  const zoobcPrefix = split[0];
  const head = split[1];
  const tail = split[split.length - 1];

  const truncateHead = head.slice(0, head.length - 4);
  const truncateTail = tail.slice(tail.length - 4, tail.length);

  return `${zoobcPrefix}_${truncateHead}...${truncateTail}`;
}

export function writeInt64(number: number | string, base?: number, endian?: any): Buffer {
  number = number.toString();
  const buffer = new Int64LE(number);
  return buffer.toBuffer();
}

export function readInt64(buff: Buffer, offset: number): string {
  const buffer = buff.slice(offset, offset + 8);
  return new Int64LE(buffer) + '';
}

export function writeInt32(number: number): Buffer {
  let byte = new Buffer(4);
  byte.writeUInt32LE(number, 0);
  return byte;
}

export async function validationTimestamp(txBytes: Buffer) {
  let timestampPostTransactionBytes = txBytes.slice(5, 13);
  let timestampPostTransaction = readInt64(timestampPostTransactionBytes, 0);
  let timestampServer = await zoobc.Node.getNodeTime().then(res => {
    return res.nodetime;
  });
  const deviation = parseInt(timestampPostTransaction) - parseInt(timestampServer);
  if (deviation < 30 && deviation > -30) return true;
  else return false;
}

export function readPostTransactionBytes(txBytes: Buffer) {
  const timestamp = readInt64(txBytes.slice(5, 13), 0);
  const senderAddressLength = txBytes.slice(13, 17).readInt32LE(0);
  const senderAddress = txBytes.slice(17, 17 + senderAddressLength).toString();
  const recipientAddressLength = txBytes.slice(83, 87).readInt32LE(0);
  const recipientAddress = txBytes.slice(87, 87 + recipientAddressLength).toString();
  const txFee = readInt64(txBytes.slice(153, 161), 0);
  let bytesConverted = {
    timestamp: timestamp,
    senderAddress: senderAddress,
    recipientAddress: recipientAddress,
    txFee: txFee,
    bodyBytes: '',
    approverAddress: '',
    commission: '',
    timeout: '',
    instruction: '',
    multisigTxType: '',
  };
  return bytesConverted;
}

export function readUpdateNodeBytes(txBytes: Buffer, bytesConverted: any) {
  const bodyBytesUpdateNodeLength = txBytes.slice(161, 165).readInt32LE(0);
  const bodyBytes = txBytes.slice(165, 165 + bodyBytesUpdateNodeLength);
  const pubkey = bodyBytes.slice(0, 32);
  const lockAmount = bodyBytes.slice(32, 40);
  const pown = bodyBytes.slice(40, 206);
  bytesConverted.recipientAddress = '';
  bytesConverted.bodyBytes = {
    pubkey: getZBCAddress(pubkey, 'ZNK'),
    lockedAmount: readInt64(lockAmount, 0),
    pown: pown,
  };
  return bytesConverted;
}

export function readSendMoneyBytes(txBytes: Buffer, bytesConverted: any) {
  const bodyBytesSendMoneyLength = txBytes.slice(161, 165).readInt32LE(0);
  const bodyBytesSendMoney = txBytes.slice(165, 165 + bodyBytesSendMoneyLength);
  bytesConverted.bodyBytes = {
    amount: readInt64(bodyBytesSendMoney, 0),
  };
  return bytesConverted;
}

export function readSendMoneyEscrowBytes(txBytes: Buffer, bytesConverted: any) {
  const approverAddressLength = txBytes.slice(173, 177).readInt32LE(0);
  const approverAddress = txBytes.slice(177, 177 + approverAddressLength);
  const int64Length = 8;
  const commission = readInt64(txBytes.slice(243, 243 + int64Length), 0);
  const timeout = readInt64(txBytes.slice(251, 251 + int64Length), 0);
  const instructionLength = txBytes.slice(259, 263).readInt32LE(0);
  const instruction = txBytes.slice(263, 263 + instructionLength);
  bytesConverted.approverAddress = getZBCAddress(approverAddress);
  bytesConverted.commission = commission;
  bytesConverted.timeout = timeout;
  bytesConverted.instruction = instruction.toString();
  return bytesConverted;
}

export function readRemoveNodeRegistrationBytes(txBytes: Buffer, bytesConverted: any) {
  const bodyBytesRemoveNodeLength = txBytes.slice(161, 165).readInt32LE(0);
  const bodyBytesRemove = txBytes.slice(165, 165 + bodyBytesRemoveNodeLength);
  bytesConverted.bodyBytes = {
    pubkey: getZBCAddress(bodyBytesRemove, 'ZNK'),
  };
  bytesConverted.recipientAddress = '';
  return bytesConverted;
}

export function readNodeRegistrationBytes(txBytes: Buffer, bytesConverted: any) {
  const bodyBytesRegisterNodeLength = txBytes.slice(161, 165).readInt32LE(0);
  const bodyBytesRegister = txBytes.slice(165, 165 + bodyBytesRegisterNodeLength);
  const pubkeyRegister = bodyBytesRegister.slice(0, 32);
  const accountaddress = bodyBytesRegister.slice(36, 102);
  const lockedBalance = bodyBytesRegister.slice(102, 110);
  bytesConverted.bodyBytes = {
    pubkey: getZBCAddress(pubkeyRegister, 'ZNK'),
    accountAddress: accountaddress.toString(),
    lockedBalance: readInt64(lockedBalance, 0),
  };
  bytesConverted.recipientAddress = '';
  return bytesConverted;
}

export function readClaimNodeBytes(txBytes: Buffer, bytesConverted: any) {
  const bodyBytesClaimNodeLength = txBytes.slice(161, 165).readInt32LE(0);
  const bodyBytesClaim = txBytes.slice(165, 165 + bodyBytesClaimNodeLength);
  const pubkeyClaim = bodyBytesClaim.slice(0, 32);
  const pownClaim = bodyBytesClaim.slice(32, 198);
  bytesConverted.bodyBytes = {
    pubkey: getZBCAddress(pubkeyClaim, 'ZNK'),
    pown: pownClaim,
  };
  bytesConverted.recipientAddress = '';
  return bytesConverted;
}

export function readSetupAccountDatasetBytes(txBytes: Buffer, bytesConverted: any) {
  const bodyBytesSetupDatasetLength = txBytes.slice(161, 165).readInt32LE(0);
  const bodyBytesSetup = txBytes.slice(165, 165 + bodyBytesSetupDatasetLength);
  const propertyLength = bodyBytesSetup.slice(0, 4).readInt32LE(0);
  const porpertyValueLength = 4 + propertyLength;
  const propertyValue = bodyBytesSetup.slice(4, porpertyValueLength);
  const startLengthValue = 4 + propertyLength;
  const endLengthValue = startLengthValue + 4;
  const valueLength = bodyBytesSetup.slice(startLengthValue, endLengthValue).readInt32LE(0);
  const value = bodyBytesSetup.slice(endLengthValue, endLengthValue + valueLength);
  bytesConverted.bodyBytes = {
    propertyLength: propertyLength,
    propertyValue: propertyValue.toString(),
    valueLength: valueLength,
    value: value.toString(),
  };
  return bytesConverted;
}

export function readRemoveDatasetBytes(txBytes: Buffer, bytesConverted: any) {
  const bodyBytesRemoveDatasetLength = txBytes.slice(161, 165).readInt32LE(0);
  const bodyBytesRemoveDataSet = txBytes.slice(165, 165 + bodyBytesRemoveDatasetLength);
  const propertyLengthRemove = bodyBytesRemoveDataSet.slice(0, 4).readInt32LE(0);
  const porpertyValueLengthRemove = 4 + propertyLengthRemove;
  const propertyValueRemove = bodyBytesRemoveDataSet.slice(4, porpertyValueLengthRemove);
  const startLengthValueRemove = 4 + propertyLengthRemove;
  const endLengthValueRemove = startLengthValueRemove + 4;
  const valueLengthRemove = bodyBytesRemoveDataSet.slice(startLengthValueRemove, endLengthValueRemove).readInt32LE(0);
  const valueRemove = bodyBytesRemoveDataSet.slice(endLengthValueRemove, endLengthValueRemove + valueLengthRemove);
  bytesConverted.bodyBytes = {
    propertyLength: porpertyValueLengthRemove,
    propertyValue: propertyValueRemove.toString(),
    valueLength: valueLengthRemove,
    value: valueRemove.toString(),
  };
  return bytesConverted;
}

export function readApprovalEscrowBytes(txBytes: Buffer, bytesConverted: any) {
  const bodyApprovalEscrowLength = txBytes.slice(161, 165).readInt32LE(0);
  const bodyApprovalEscrow = txBytes.slice(165, 165 + bodyApprovalEscrowLength);
  const approvalCode = bodyApprovalEscrow.slice(0, 4).readInt32LE(0);
  const txId = readInt64(bodyApprovalEscrow.slice(4, 12), 0);
  bytesConverted.bodyBytes = {
    approvalCode: approvalCode,
    txId: txId,
  };
  return bytesConverted;
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
