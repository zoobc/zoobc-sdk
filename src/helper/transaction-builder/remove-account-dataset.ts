import { accountToBytes, writeInt32, writeInt64, ZBCAddressToBytes } from '../utils';
import { VERSION } from './constant';
import { BIP32Interface } from 'bip32';
import { generateTransactionHash } from '../wallet/MultiSignature';
import { EscrowTransactionInterface } from './send-money';
import { Account } from '../interfaces';
import { TransactionType } from '../../../grpc/model/transaction_pb';
import { addEscrowBytes } from './escrow-transaction';

const TRANSACTION_TYPE = writeInt32(TransactionType.REMOVEACCOUNTDATASETTRANSACTION);

export interface RemoveDatasetInterface extends EscrowTransactionInterface {
  property: string;
  value: string;
  setterAccountAddress: Account;
  recipientAccountAddress: Account;
  fee: number;
}

export function removeDatasetBuilder(data: RemoveDatasetInterface, seed?: BIP32Interface): Buffer {
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
