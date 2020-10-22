import { writeInt32, writeInt64, ZBCAddressToBytes } from '../utils';
import { ADDRESS_LENGTH, VERSION } from './constant';
import { BIP32Interface } from 'bip32';
import { generateTransactionHash } from '../wallet/MultiSignature';

const TRANSACTION_TYPE = new Buffer([3, 1, 0, 0]);

export interface RemoveDatasetInterface {
  property: string;
  value: string;
  setterAccountAddress: string;
  recipientAccountAddress: string;
  fee: number;
}

export function removeDatasetBuilder(data: RemoveDatasetInterface, seed?: BIP32Interface): Buffer {
  let bytes: Buffer;

  const timestamp = writeInt64(Math.trunc(Date.now() / 1000));
  const setterAccountAddress = Buffer.from(data.setterAccountAddress, 'utf-8');
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
    setterAccountAddress,
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

  if (seed) {
    const signatureType = writeInt32(0);
    const txFormat = generateTransactionHash(bytes);
    const txBytes = ZBCAddressToBytes(txFormat)
    const signature = seed.sign(txBytes);
    const bodyLengthSignature = writeInt32(signatureType.length + signature.length);
    return Buffer.concat([bytes, bodyLengthSignature, signatureType, signature]);
  } else return bytes;
}

export function readRemoveDatasetBytes(txBytes: Buffer) {
  const bodyBytesRemoveDatasetLength = txBytes.slice(161, 165).readInt32LE(0);
  const bodyBytesRemoveDataSet = txBytes.slice(165, 165 + bodyBytesRemoveDatasetLength);
  const propertyLengthRemove = bodyBytesRemoveDataSet.slice(0, 4).readInt32LE(0);
  const porpertyValueLengthRemove = 4 + propertyLengthRemove;
  const propertyValueRemove = bodyBytesRemoveDataSet.slice(4, porpertyValueLengthRemove);
  const startLengthValueRemove = 4 + propertyLengthRemove;
  const endLengthValueRemove = startLengthValueRemove + 4;
  const valueLengthRemove = bodyBytesRemoveDataSet.slice(startLengthValueRemove, endLengthValueRemove).readInt32LE(0);
  const valueRemove = bodyBytesRemoveDataSet.slice(endLengthValueRemove, endLengthValueRemove + valueLengthRemove);
  const txBody = {
    propertyLength: porpertyValueLengthRemove,
    property: propertyValueRemove.toString(),
    valueLength: valueLengthRemove,
    value: valueRemove.toString(),
  };
  return txBody;
}
