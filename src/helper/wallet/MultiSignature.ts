// Licensed to the Quasisoft Limited - Hong Kong under one or more agreements
// The Quasisoft Limited - Hong Kong licenses this file to you under MIT license.

import { MultisigPendingTxResponse, MultisigPendingTxDetailResponse } from '../../MultiSignature';
import { getZBCAddress, readAddress, readInt64 } from '../utils';
import { parseAddress } from '../utils';
import { MultiSignatureInfo, PendingSignature } from '../../../grpc/model/multiSignature_pb';
import { Address } from '../interfaces';
import { ZBCTransaction, ZBCTransactions } from './Transaction';
import { readBodyBytes } from '../transaction-builder/post-transaction';

export type multisignatureinfo = MultiSignatureInfo.AsObject;
export type pendingsignaturesList = Array<PendingSignature.AsObject>;

export interface multisigPendingDetail {
  pendingtransaction: ZBCTransaction;
  pendingsignaturesList: {
    accountaddress: Address;
    blockheight: number;
    latest: boolean;
    signature: string | Uint8Array;
    transactionhash: string;
  }[];
  multisignatureinfo?: {
    addressesList: Address[];
    blockheight: number;
    latest: boolean;
    minimumsignatures: number;
    multisigaddress: Address;
    nonce: string;
  };
}

export function toGetPendingList(res: MultisigPendingTxResponse): ZBCTransactions {
  const list = res.pendingtransactionsList.map(tx => {
    return toGetPending(tx);
  });
  return {
    total: res.count,
    transactions: list,
  };
}

export function toGetPending(tx: any): ZBCTransaction {
  const txBytes = Buffer.from(tx.transactionbytes.toString(), 'base64');
  let offset = 0;

  const transactionType = txBytes.readUInt32LE(offset);
  offset += 4;

  const version = txBytes.readUInt8(offset);
  offset += 1;

  const timestamp = readInt64(txBytes, offset);
  offset += 8;

  const senderBytes = readAddress(txBytes, offset);
  const sender = parseAddress(senderBytes);
  offset += senderBytes.length;

  const recipientBytes = readAddress(txBytes, offset);
  const recipient = parseAddress(recipientBytes);
  offset += recipientBytes.length;

  const txFee = readInt64(txBytes, offset);
  offset += 8;

  const bodyBytesLength = txBytes.readUInt32LE(offset);
  offset += 4;

  const txBody = readBodyBytes(txBytes, transactionType, offset);
  offset += bodyBytesLength;

  let transaction: ZBCTransaction = {
    timestamp: parseInt(timestamp) * 1000,
    sender,
    recipient,
    fee: parseInt(txFee),
    escrow: false,
    transactionType,
    txBody,
    transactionHash: getZBCAddress(Buffer.from(tx.transactionhash.toString(), 'base64'), 'ZTX'),
    height: tx.blockheight,
    multisig: true,
  };

  const approverBytes = readAddress(txBytes, offset);
  const approver = parseAddress(approverBytes);
  offset += senderBytes.length;

  if (approver.type != 2) {
    transaction.escrow = true;
    transaction.approverAddress = approver;

    transaction.commission = parseInt(readInt64(txBytes, offset));
    offset += 8;

    transaction.timeout = parseInt(readInt64(txBytes, offset));
    offset += 8;

    const instructionLength = txBytes.readInt32LE(offset);
    offset += 4;

    transaction.instruction = txBytes.slice(offset, offset + instructionLength).toString('utf-8');
    offset += instructionLength;
  }

  return transaction;
}

export function toGetPendingDetail(tx: MultisigPendingTxDetailResponse): multisigPendingDetail {
  const addressList = tx.multisignatureinfo?.addressesList.map(res => parseAddress(res));
  const multisigAddress = parseAddress(tx.multisignatureinfo?.multisigaddress!);
  const multisignatureinfo = {
    addressesList: addressList!,
    blockheight: tx.multisignatureinfo?.blockheight!,
    latest: tx.multisignatureinfo?.latest!,
    minimumsignatures: tx.multisignatureinfo?.minimumsignatures!,
    multisigaddress: multisigAddress,
    nonce: tx.multisignatureinfo?.nonce!,
  };

  const pendingsignaturesList = tx.pendingsignaturesList.map(res => {
    const accountAddress = parseAddress(res.accountaddress);
    const txHash = getZBCAddress(Buffer.from(res.transactionhash), 'ZTX');
    return {
      accountaddress: accountAddress,
      blockheight: res.blockheight,
      latest: res.latest,
      signature: res.signature,
      transactionhash: txHash,
    };
  });
  const pendingtransaction = toGetPending(tx.pendingtransaction);
  return {
    pendingtransaction,
    pendingsignaturesList,
    multisignatureinfo,
  };
}
