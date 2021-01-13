import { addressToBytes, generateTransactionHash, writeInt32, writeInt64, ZBCAddressToBytes } from '../utils';
import { VERSION } from './constant';
import { BIP32Interface } from 'bip32';
import { EscrowTransactionInterface } from './send-money';
import { Address } from '../interfaces';
import { TransactionType } from '../../../grpc/model/transaction_pb';
import { addEscrowBytes } from './escrow-transaction';

const TRANSACTION_TYPE = writeInt32(TransactionType.SETUPACCOUNTDATASETTRANSACTION);

export interface SetupDatasetInterface extends EscrowTransactionInterface {
  property: string;
  value: string;
  setterAccountAddress: Address;
  recipientAccountAddress: Address;
  fee: number;
}

export function setupDatasetBuilder(data: SetupDatasetInterface, seed?: BIP32Interface): Buffer {
  let bytes: Buffer;

  const timestamp = writeInt64(Math.trunc(Date.now() / 1000));
  const sender = addressToBytes(data.setterAccountAddress);
  const recipient = addressToBytes(data.recipientAccountAddress);
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
    sender,
    recipient,
    fee,
    bodyLength,
    propertyLength,
    property,
    valueLength,
    value,
  ]);

  // Add Escrow Bytes
  bytes = addEscrowBytes(bytes, data);

  const message = writeInt32(0);
  bytes = Buffer.concat([bytes, message]);

  if (seed) {
    const txHash = ZBCAddressToBytes(generateTransactionHash(bytes));
    const signature = seed.sign(txHash);
    return Buffer.concat([bytes, signature]);
  } else return bytes;
}

export function readSetupDatasetBytes(txBytes: Buffer, offset: number) {
  const propertyLength = txBytes.readInt32LE(offset);
  offset += 4;

  const property = txBytes.slice(offset, offset + propertyLength).toString('utf-8');
  offset += propertyLength;

  const valueLength = txBytes.readInt32LE(offset);
  offset += 4;

  const value = txBytes.slice(offset, offset + valueLength).toString('utf-8');
  return { property, value };
}
