import { writeInt32, writeInt64 } from '../utils';
import { ADDRESS_LENGTH, VERSION } from './constant';
import { BIP32Interface } from 'bip32';

const TRANSACTION_TYPE = new Buffer([1, 0, 0, 0]);

export interface SendMoneyInterface {
  sender: string;
  recipient: string;
  fee: number;
  amount: number;
  approverAddress?: string;
  commission?: number;
  timeout?: number;
  instruction?: string;
}

export function sendMoneyBuilder(data: SendMoneyInterface, seed?: BIP32Interface): Buffer {
  let bytes: Buffer;

  const timestamp = writeInt64(Math.trunc(Date.now() / 1000));
  const sender = Buffer.from(data.sender, 'utf-8');
  const recipient = Buffer.from(data.recipient, 'utf-8');
  const addressLength = writeInt32(ADDRESS_LENGTH);
  const fee = writeInt64(data.fee * 1e8);
  const amount = writeInt64(data.amount * 1e8);
  const bodyLength = writeInt32(amount.length);

  bytes = Buffer.concat([TRANSACTION_TYPE, VERSION, timestamp, addressLength, sender, addressLength, recipient, fee, bodyLength, amount]);

  if (data.approverAddress && data.commission && data.timeout && data.instruction) {
    // escrow bytes
    const approverAddressLength = writeInt32(ADDRESS_LENGTH);
    const approverAddress = Buffer.from(data.approverAddress, 'utf-8');
    const commission = writeInt64(data.commission * 1e8);
    const timeout = writeInt64(data.timeout);
    const instruction = Buffer.from(data.instruction, 'utf-8');
    const instructionLength = writeInt32(instruction.length);

    bytes = Buffer.concat([bytes, approverAddressLength, approverAddress, commission, timeout, instructionLength, instruction]);
  } else {
    // escrow bytes default value
    const approverAddressLength = writeInt32(0);
    const commission = writeInt64(0);
    const timeout = writeInt64(0);
    const instructionLength = writeInt32(0);

    bytes = Buffer.concat([bytes, approverAddressLength, commission, timeout, instructionLength]);
  }

  if (seed) {
    const signatureType = writeInt32(0);
    const signature = seed.sign(bytes);
    const bodyLengthSignature = writeInt32(signatureType.length + signature.length);
    return Buffer.concat([bytes, bodyLengthSignature, signatureType, signature]);
  } else return bytes;
}
