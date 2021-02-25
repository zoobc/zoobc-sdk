// Licensed to the Quasisoft Limited - Hong Kong under one or more agreements
// The Quasisoft Limited - Hong Kong licenses this file to you under MIT license.

import { BIP32Interface } from 'bip32';
import { AccountType } from '../../../grpc/model/accountType_pb';
import { TransactionType } from '../../../grpc/model/transaction_pb';
import { Address } from '../interfaces';
import { writeInt64, writeInt32, ZBCAddressToBytes, addressToBytes, generateTransactionHash } from '../utils';
import { VERSION } from './constant';
import { addEscrowBytes } from './escrow-transaction';
import { SendZBCInterface } from './send-money';

const TRANSACTION_TYPE = writeInt32(TransactionType.LIQUIDPAYMENTTRANSACTION);

export interface LiquidTransactionsInterface extends SendZBCInterface {
  completeMinutes: number;
}

export function liquidTransactionBuilder(data: LiquidTransactionsInterface, seed?: BIP32Interface): Buffer {
  let bytes: Buffer;

  const sender = addressToBytes(data.sender);
  const recipient = addressToBytes(data.recipient);
  const amount = writeInt64(data.amount * 1e8);
  const fee = writeInt64(data.fee * 1e8);
  const completeMinutes = writeInt64(data.completeMinutes)

  bytes = Buffer.concat([
    TRANSACTION_TYPE,
    VERSION,
    sender,
    recipient,
    amount,
    fee,
    completeMinutes,
  ]);

  if (seed) {
    const txHash = ZBCAddressToBytes(generateTransactionHash(bytes));
    const signature = seed.sign(txHash);
    return Buffer.concat([bytes, signature]);
  } else return bytes;
}