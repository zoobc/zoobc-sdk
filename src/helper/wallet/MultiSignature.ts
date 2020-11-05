import { MultisigPendingTxResponse, MultisigPendingTxDetailResponse } from '../../MultiSignature';
import { readInt64, ZBCTransaction, ZBCTransactions } from '../..';
import { getZBCAddress, readAddress, readBodyBytes } from '../utils';
import { sha3_256 } from 'js-sha3';
import { parseAddress } from '../utils';
import { MultiSignatureInfo, PendingSignature } from '../../../grpc/model/multiSignature_pb';

export type multisignatureinfo = MultiSignatureInfo.AsObject;
export type pendingsignaturesList = Array<PendingSignature.AsObject>;

export interface MultiSigPendingDetailResponse {
  pendingtransaction: ZBCTransaction;
  pendingsignaturesList: pendingsignaturesList;
  multisignatureinfo?: multisignatureinfo;
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

export function toGetPendingDetail(tx: MultisigPendingTxDetailResponse): MultiSigPendingDetailResponse {
  const transction = toGetPending(tx.pendingtransaction);
  return {
    pendingtransaction: transction,
    pendingsignaturesList: tx.pendingsignaturesList,
    multisignatureinfo: tx.multisignatureinfo,
  };
}

export function generateTransactionHash(buffer: Buffer): string {
  const hashed = Buffer.from(sha3_256(buffer), 'hex');
  return getZBCAddress(hashed, 'ZTX');
}
