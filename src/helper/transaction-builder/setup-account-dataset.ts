import { writeInt32, writeInt64 } from '../utils';
import { ADDRESS_LENGTH, VERSION } from './constant';
import { BIP32Interface } from 'bip32';

const TRANSACTION_TYPE = new Buffer([3, 0, 0, 0]);

export interface SetupDatasetInterface {
  property: string;
  value: string;
  setterAccountAddress: string;
  recipientAccountAddress: string;
  fee: number;
}

export function setupDatasetBuilder(data: SetupDatasetInterface, seed: BIP32Interface): Buffer {
  let bytes: Buffer;

  const timestamp = writeInt64(Math.trunc(Date.now() / 1000));
  const accountAddress = Buffer.from(data.setterAccountAddress, 'utf-8');
  const recipient = Buffer.from(data.recipientAccountAddress, 'utf-8');
  const addressLength = writeInt32(ADDRESS_LENGTH);
  const fee = writeInt64(data.fee * 1e8);

  const property = Buffer.from(data.property, 'utf-8');
  const propertyLength = writeInt32(property.length);
  const value = Buffer.from(data.value, 'utf-8');
  const valueLength = writeInt32(value.length);
  const bodyLength = writeInt32(propertyLength.length + property.length + valueLength.length + value.length);

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
    propertyLength,
    property,
    valueLength,
    value,
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
