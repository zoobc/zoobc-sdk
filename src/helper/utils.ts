import { toBase64Url, base64ToBuffer, fromBase64Url } from './converters';
import * as CryptoJS from 'crypto-js';
import BN from 'bn.js';
import SHA3 from 'sha3';
import B32Enc from 'base32-encode';
import B32Dec from 'base32-decode';

// getAddressFromPublicKey Get the formatted address from a raw public key
export function getZBCAdress(publicKey: Uint8Array): string {
  const prefix = 'ZBC';
  const bytes = Buffer.alloc(35);
  for (let i = 0; i < 32; i++) bytes[i] = publicKey[i];
  for (let i = 0; i < 3; i++) bytes[i + 32] = prefix.charCodeAt(i);
  const checksum = hash(bytes);
  for (let i = 0; i < 3; i++) bytes[i + 32] = Number(checksum[i]);
  const segs = [prefix];
  const b32 = B32Enc(bytes, 'RFC4648');
  for (let i = 0; i < 7; i++) segs.push(b32.substr(i * 8, 8));

  return segs.join('_');
}

export function hash(str: any, format: string = 'buffer') {
  const h = new SHA3(256);
  h.update(str);
  const b = h.digest();
  if (format == 'buffer') return b;
  return b.toString(format);
}

export function getChecksumByte(bytes: Uint8Array): Uint8Array {
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

export function isZBCAddressValid(address: string): boolean {
  if (address.length != 66) return false;
  const segs = address.split('_');
  const stdPrefix = 'ZBC';
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

export function isZBCPublicKeyValid(pubkey: string): boolean {
  const addressBytes = base64ToBuffer(pubkey);
  if (addressBytes.length == 32 && pubkey.length == 44) {
    return true;
  } else return false;
}

export function writeInt64(number: number | string, base?: number, endian?: any): Buffer {
  number = number.toString();
  let bn = new BN(number, base, endian);
  let buffer = bn.toArrayLike(Buffer, 'le', 8);
  if (number[0] == '-') {
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
