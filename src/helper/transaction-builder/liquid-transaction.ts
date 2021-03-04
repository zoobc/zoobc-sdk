// Licensed to the Quasisoft Limited - Hong Kong under one or more agreements
// The Quasisoft Limited - Hong Kong licenses this file to you under MIT license.

import { VERSION } from './constant';
import { BIP32Interface } from 'bip32';
import { Address } from '../interfaces';
import { addEscrowBytes } from './escrow-transaction';
import { EscrowTransactionInterface } from './send-money';
import { TransactionType } from '../../../grpc/model/transaction_pb';
import { writeInt64, writeInt32, ZBCAddressToBytes, addressToBytes, readInt64, generateTransactionHash } from '../utils';

const TRANSACTION_TYPE = writeInt32(TransactionType.LIQUIDPAYMENTTRANSACTION);

export interface LiquidTransactionsInterface extends EscrowTransactionInterface {
  sender: Address;
  recipient: Address;
  fee: number;
  message?: string;
  amount: number;
  completeMinutes: number;
}

export function liquidTransactionBuilder(data: LiquidTransactionsInterface, seed?: BIP32Interface): Buffer {
  let bytes: Buffer;

  const timestamp = writeInt64(Math.trunc(Date.now() / 1000));
  const sender = addressToBytes(data.sender);
  const recipient = addressToBytes(data.recipient);
  const fee = writeInt64(data.fee * 1e8);
  const amount = writeInt64(data.amount * 1e8);
  const completeMinutes = writeInt64(data.completeMinutes);
  const bodyLength = writeInt32(amount.length + completeMinutes.length);

  bytes = Buffer.concat([TRANSACTION_TYPE, VERSION, timestamp, sender, recipient, fee, bodyLength, amount, completeMinutes]);

  bytes = addEscrowBytes(bytes, data);

  // Add message
  let message = writeInt32(0);
  if (data.message) {
    message = writeInt32(data.message.length);
    message = Buffer.concat([message, Buffer.from(data.message)]);
  }

  bytes = Buffer.concat([bytes, message]);

  if (seed) {
    const txHash = ZBCAddressToBytes(generateTransactionHash(bytes));
    const signature = seed.sign(txHash);
    return Buffer.concat([bytes, signature]);
  } else return bytes;
}

export function addLiquidBytes(bytes: Buffer, data: any): Buffer {
  if (data.completeMinutes) {
    const completeMinutes = writeInt64(data.completeMinutes);
    bytes = Buffer.concat([bytes, completeMinutes]);
  }
  return bytes;
}

export function readLiquidBytes(txBytes: Buffer, offset: number): any {
  const amount = parseInt(readInt64(txBytes, offset));
  offset+=8
  const completeminutes = parseInt(readInt64(txBytes, offset));
  return { amount, completeminutes };
}
