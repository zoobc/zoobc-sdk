import { BIP32Interface } from 'bip32';
import { addressToBytes, ZBCAddressToBytes, generateTransactionHash, TransactionType } from '../..';
import { AccountType } from '../../../grpc/model/accountType_pb';
import { Address } from '../interfaces';
import { writeInt64, writeInt32, writeUInt64 } from '../utils';
import { VERSION } from './constant';
import { addEscrowBytes } from './escrow-transaction';

const TRANSACTION_TYPE_LIQUID_PAYMENT = writeInt32(TransactionType.LIQUIDPAYMENTTRANSACTION);
const TRANSACTION_TYPE_LIQUID_PAYMENT_STOP = writeInt32(TransactionType.LIQUIDPAYMENTSTOPTRANSACTION);

export interface LiquidPayment {
  sender: Address;
  amount: number;
  recipient: Address;
  completeMinutes: number;
  fee: number;
}

export interface LiquidPaymentStop {
  sender: Address;
  fee: number;
  transactionId: string;
}

export function liquidPaymentBuilder(data: LiquidPayment, seed?: BIP32Interface): Buffer {
  let bytes: Buffer;

  const timestamp = writeInt64(Math.trunc(Date.now() / 1000));
  const sender = addressToBytes(data.sender);
  const recipient = addressToBytes(data.recipient);
  const fee = writeInt64(data.fee * 1e8);

  const amount = writeInt64(data.amount * 1e8);
  const completeMinutes = writeUInt64(data.completeMinutes);

  const bodyLength = writeInt32(amount.length + completeMinutes.length);

  bytes = Buffer.concat([TRANSACTION_TYPE_LIQUID_PAYMENT, VERSION, timestamp, sender, recipient, fee, bodyLength, amount, completeMinutes]);

  // Add Escrow Bytes
  bytes = addEscrowBytes(bytes, data);

  const message = writeInt32(0);
  bytes = Buffer.concat([bytes, message]);

  const txHash = ZBCAddressToBytes(generateTransactionHash(bytes));
  if (seed) {
    const signature = seed.sign(txHash);
    return Buffer.concat([bytes, signature]);
  } else {
    return bytes;
  }
}

export function liquidPaymentStopBuilder(data: LiquidPaymentStop, seed?: BIP32Interface): Buffer {
  let bytes: Buffer;

  const timestamp = writeInt64(Math.trunc(Date.now() / 1000));
  const sender = addressToBytes(data.sender);
  const recipient = writeInt32(AccountType.EMPTYACCOUNTTYPE);
  const fee = writeInt64(data.fee * 1e8);

  const transactionId = writeInt64(data.transactionId);
  const bodyLength = writeInt32(transactionId.length);

  bytes = Buffer.concat([TRANSACTION_TYPE_LIQUID_PAYMENT_STOP, VERSION, timestamp, sender, recipient, fee, bodyLength, transactionId]);

  // Add Escrow Bytes
  bytes = addEscrowBytes(bytes, data);

  const message = writeInt32(0);
  bytes = Buffer.concat([bytes, message]);

  const txHash = ZBCAddressToBytes(generateTransactionHash(bytes));
  if (seed) {
    const signature = seed.sign(txHash);
    return Buffer.concat([bytes, signature]);
  } else {
    return bytes;
  }
}
