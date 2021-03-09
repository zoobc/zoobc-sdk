// Licensed to the Quasisoft Limited - Hong Kong under one or more agreements
// The Quasisoft Limited - Hong Kong licenses this file to you under MIT license.

import {
  writeInt64,
  writeInt32,
  getZBCAddress,
  readInt64,
  ZBCAddressToBytes,
  addressToBytes,
  parseAddress,
  generateTransactionHash,
} from '../utils';
import { ADDRESS_LENGTH, ADDRESS_WITH_TYPE, VERSION } from './constant';
import { BIP32Interface } from 'bip32';
import { EscrowTransactionInterface } from './send-money';
import { Address } from '../interfaces';
import { TransactionType } from '../../../grpc/model/transaction_pb';
import { AccountType } from '../../../grpc/model/accountType_pb';
import { addEscrowBytes } from './escrow-transaction';

const TRANSACTION_TYPE = writeInt32(TransactionType.NODEREGISTRATIONTRANSACTION);

export interface RegisterNodeInterface extends EscrowTransactionInterface {
  accountAddress: Address;
  fee: number;
  nodePublicKey: Buffer;
  nodeAddress: string;
  funds: number;
  message?: string;
}

export function registerNodeBuilder(data: RegisterNodeInterface, poown: Buffer, seed?: BIP32Interface): Buffer {
  let bytes: Buffer;

  const timestamp = writeInt64(Math.trunc(Date.now() / 1000));
  const sender = addressToBytes(data.accountAddress);
  const recipient = writeInt32(AccountType.EMPTYACCOUNTTYPE);
  const fee = writeInt64(data.fee * 1e8);

  const nodePublicKey = data.nodePublicKey;
  const funds = writeInt64(data.funds * 1e8);
  const bodyLength = writeInt32(nodePublicKey.length + sender.length + funds.length + poown.length);

  bytes = Buffer.concat([TRANSACTION_TYPE, VERSION, timestamp, sender, recipient, fee, bodyLength, nodePublicKey, sender, funds, poown]);

  // Add Escrow Bytes
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

export function readRegisterNodeBytes(txBytes: Buffer, offset: number) {
  const nodepublickey = getZBCAddress(txBytes.slice(offset, offset + ADDRESS_LENGTH), 'ZNK');
  offset += ADDRESS_LENGTH;

  const accountaddress = parseAddress(txBytes.slice(offset, offset + ADDRESS_WITH_TYPE));
  offset += ADDRESS_WITH_TYPE;

  const lockedbalance = parseInt(readInt64(txBytes, offset));
  return { nodepublickey, accountaddress, lockedbalance };
}
