import { accountToBytes, writeInt32, writeInt64, ZBCAddressToBytes } from '../utils';
import { VERSION } from './constant';
import { BIP32Interface } from 'bip32';
import { generateTransactionHash } from '../wallet/MultiSignature';
import { EscrowTransactionInterface } from './send-money';
import { Account } from '../interfaces';
import { TransactionType } from '../../../grpc/model/transaction_pb';
import { addEscrowBytes } from './escrow-transaction';

const TRANSACTION_TYPE = writeInt32(TransactionType.SETUPACCOUNTDATASETTRANSACTION);

export interface SetupDatasetInterface extends EscrowTransactionInterface {
  property: string;
  value: string;
  setterAccountAddress: Account;
  recipientAccountAddress: Account;
  fee: number;
}

export function setupDatasetBuilder(data: SetupDatasetInterface, seed?: BIP32Interface): Buffer {
  let bytes: Buffer;

  const timestamp = writeInt64(Math.trunc(Date.now() / 1000));
  const sender = accountToBytes(data.setterAccountAddress);
  const recipient = accountToBytes(data.recipientAccountAddress);
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

export function readSetupAccountDatasetBytes(txBytes: Buffer) {
  const bodyBytesSetupDatasetLength = txBytes.slice(161, 165).readInt32LE(0);
  const bodyBytesSetup = txBytes.slice(165, 165 + bodyBytesSetupDatasetLength);
  const propertyLength = bodyBytesSetup.slice(0, 4).readInt32LE(0);
  const porpertyValueLength = 4 + propertyLength;
  const propertyValue = bodyBytesSetup.slice(4, porpertyValueLength);
  const startLengthValue = 4 + propertyLength;
  const endLengthValue = startLengthValue + 4;
  const valueLength = bodyBytesSetup.slice(startLengthValue, endLengthValue).readInt32LE(0);
  const value = bodyBytesSetup.slice(endLengthValue, endLengthValue + valueLength);
  const bodyBytes = {
    propertyLength: propertyLength,
    property: propertyValue.toString(),
    valueLength: valueLength,
    value: value.toString(),
  };
  return bodyBytes;
}
