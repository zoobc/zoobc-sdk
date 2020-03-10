import { toBase64Url, base64ToBuffer, fromBase64Url } from './converters';
import * as CryptoJS from 'crypto-js';
import BN from 'bn.js';

// getAddressFromPublicKey Get the formatted address from a raw public key
export function getZBCAdress(publicKey: Uint8Array): string {
  const checksum = getChecksumByte(publicKey);
  let binary = '';
  const bytes = new Uint8Array(33);
  bytes.set(publicKey, 0);
  bytes.set([checksum[0]], 32);

  const len = bytes.byteLength;
  for (let i = 0; i < len; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return toBase64Url(window.btoa(binary));
}

function getChecksumByte(bytes: Uint8Array): Uint8Array {
  let n = bytes.length;
  let a = 0;
  for (let i = 0; i < n; i++) {
    a += bytes[i];
  }
  const res = new Uint8Array([a]);
  return res;
}

export function encryptPassword(password: string, salt: string = 'salt'): string {
  return CryptoJS.PBKDF2(password, salt, {
    keySize: 8,
    iterations: 10000,
  }).toString();
}

export function ZBCAddressValidation(address: string): boolean {
  const addressBase64 = fromBase64Url(address);
  const addressBytes = base64ToBuffer(addressBase64);
  if (addressBytes.length == 33 && addressBase64.length == 44) {
    return true;
  } else return false;
}

export function isZBCPublicKeyValid(pubkey: string): boolean {
  const addressBytes = base64ToBuffer(pubkey);
  if (addressBytes.length == 32 && pubkey.length == 44) {
    return true;
  } else return false;
}

export function writeInt64(number: number | string, base?: number, endian?: any): Buffer {
  let bn = new BN(number, base, endian);
  let buffer = bn.toArrayLike(Buffer, 'le', 8);
  if (number.toString()[0] == '-') {
    let array = buffer.map((b, i) => {
      if (i == 0) b = Math.abs(b - 256);
      else b = Math.abs(b - 255);
      return b;
    });
    buffer = new Buffer(array);
  }
  return buffer;
}

export function readInt64(buff: Buffer, offset: number): number {
  var buff1 = buff.readUInt32LE(offset);
  var buff2 = buff.readUInt32LE(offset + 4);
  if (!(buff2 & 0x80000000)) return buff1 + 0x100000000 * buff2;
  return -((~buff2 >>> 0) * 0x100000000 + (~buff1 >>> 0) + 1);
}

export function writeInt32(number: number): Buffer {
  let byte = new Buffer(4);
  byte.writeUInt32LE(number, 0);
  return byte;
}
