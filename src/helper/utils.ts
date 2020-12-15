import * as CryptoJS from 'crypto-js';
import SHA3 from 'sha3';
import B32Enc from 'base32-encode';
import B32Dec from 'base32-decode';
import { Int64LE } from 'int64-buffer';
import zoobc from '..';
import { Address } from './interfaces';
import { AccountType } from '../../grpc/model/accountType_pb';
import { TransactionType } from '../../grpc/model/transaction_pb';
import { readClaimNodeBytes } from './transaction-builder/claim-node';
import { readApprovalEscrowBytes } from './transaction-builder/escrow-transaction';
import { readRegisterNodeBytes } from './transaction-builder/register-node';
import { readRemoveNodeBytes } from './transaction-builder/remove-node';
import { readSendMoneyBytes } from './transaction-builder/send-money';
import { readSetupDatasetBytes } from './transaction-builder/setup-account-dataset';
import { readUpdateNodeBytes } from './transaction-builder/update-node';
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

export function hash(str: any, format: any = 'buffer') {
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

export function isZBCAddressValid(address: string, prefixAddress?: string): boolean {
  if (address.length != 66) return false;
  const segs = address.split('_');
  const prefix = segs[0];
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
  if (prefixAddress) {
    if (prefix != prefixAddress) return false;
  }
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
  let byte = Buffer.alloc(4);
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

export function parseAddress(account: string | Uint8Array): Address {
  if (account == '') return { value: '', type: 2 };

  // convert to bytes
  let accountBytes: Buffer;
  if (typeof account == 'string') accountBytes = Buffer.from(account.toString(), 'base64');
  else accountBytes = Buffer.from(account);

  const type = accountBytes.readInt32LE(0);

  let value = '';
  switch (type) {
    case AccountType.ZBCACCOUNTTYPE:
      value = getZBCAddress(accountBytes.slice(4, 36));
      return { value, type };
    case AccountType.BTCACCOUNTTYPE:
      return { value, type };
    default:
      return { value, type };
  }
}

export function addressToBytes(account: Address): Buffer {
  const type = account.type;
  switch (type) {
    case AccountType.ZBCACCOUNTTYPE:
      const bytes = ZBCAddressToBytes(account.value);
      const typeBytes = writeInt32(account.type);
      return Buffer.from([...typeBytes, ...bytes]);
    case AccountType.BTCACCOUNTTYPE:
      return Buffer.from([]);
    default:
      return Buffer.from([]);
  }
}

export function readAddress(txBytes: Buffer, offset: number): Buffer {
  const type = txBytes.readUInt32LE(offset);
  if (type == AccountType.EMPTYACCOUNTTYPE) return txBytes.slice(offset, offset + 4);
  else return txBytes.slice(offset, offset + 36);
}

export function readBodyBytes(txBytes: Buffer, txType: number, offset: number): any {
  switch (txType) {
    case TransactionType.UPDATENODEREGISTRATIONTRANSACTION:
      return readUpdateNodeBytes(txBytes, offset);
    case TransactionType.SENDMONEYTRANSACTION:
      return readSendMoneyBytes(txBytes, offset);
    case TransactionType.REMOVENODEREGISTRATIONTRANSACTION:
      return readRemoveNodeBytes(txBytes, offset);
    case TransactionType.NODEREGISTRATIONTRANSACTION:
      return readRegisterNodeBytes(txBytes, offset);
    case TransactionType.CLAIMNODEREGISTRATIONTRANSACTION:
      return readClaimNodeBytes(txBytes, offset);
    case TransactionType.SETUPACCOUNTDATASETTRANSACTION:
      return readSetupDatasetBytes(txBytes, offset);
    case TransactionType.REMOVEACCOUNTDATASETTRANSACTION:
      return readSetupDatasetBytes(txBytes, offset);
    case TransactionType.APPROVALESCROWTRANSACTION:
      return readApprovalEscrowBytes(txBytes, offset);
  }
}
