import { writeInt32, getChecksumByte } from './helper/utils';
import { toBase64Url } from './helper/converters';
import { sha3_256 } from 'js-sha3';

export interface MultiSigAddress {
  participants: string[];
  nonce: number;
  minSigs: number;
}

export function generateMultiSigInfo(multiSigAddress: MultiSigAddress): Buffer {
  const { nonce, minSigs } = multiSigAddress;
  let { participants } = multiSigAddress;

  participants = participants.sort();

  const nonceB = writeInt32(nonce);
  const minSigB = writeInt32(minSigs);
  const lengthParticipants = writeInt32(participants.length);

  let participantsB = new Buffer([]);
  participants.forEach((p: string) => {
    const lengthAddress = writeInt32(p.length);
    const address = Buffer.from(p, 'utf-8');
    participantsB = Buffer.concat([participantsB, lengthAddress, address]);
  });
  return Buffer.concat([minSigB, nonceB, lengthParticipants, participantsB]);
}

export function createMultiSigAddress(multiSigAddress: MultiSigAddress): string {
  const buffer = generateMultiSigInfo(multiSigAddress);
  const hashed = Buffer.from(sha3_256(buffer), 'hex');
  const checksum = Buffer.from(getChecksumByte(hashed));
  let binary = '';
  let bytes = new Buffer([]);

  bytes = Buffer.concat([hashed, checksum]);

  const len = bytes.byteLength;
  for (let i = 0; i < len; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return toBase64Url(window.btoa(binary));
}

export default { generateMultiSigInfo, createMultiSigAddress };
