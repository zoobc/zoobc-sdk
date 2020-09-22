import { readInt64, getZBCAddress } from '../utils';
import { GetTransactionsResponse, Transaction } from '../../../grpc/model/transaction_pb';

export interface ZooTransactionsInterface {
  total: number;
  transactions: ZooTransactionInterface[];
}

export interface ZooTransactionInterface {
  id: string;
  address: string;
  timestamp: number;
  fee: number;
  type: string;
  amount: number;
  blockId: string;
  height: number;
  transactionIndex: number;
}

export interface ZooTransactions {
  total: number;
  transactions: ZooTransaction[];
}

export interface ZooTransaction {
  id: string;
  sender: string;
  recipient: string;
  timestamp: number;
  fee: number;
  blockId: string;
  height: number;
  transactionIndex: number;
  transactionHash: string;
  transactionType: number;
  txBody: object;
}

export function toTransactions(transactions: Array<Transaction.AsObject>): ZooTransaction[] {
  let transactionList: ZooTransaction[] = transactions.map(tx => {
    const txBody = getBodyBytes(tx);
    return {
      id: tx.id,
      sender: tx.senderaccountaddress,
      recipient: tx.recipientaccountaddress,
      timestamp: parseInt(tx.timestamp) * 1000,
      fee: parseInt(tx.fee),
      blockId: tx.blockid,
      height: tx.height,
      transactionIndex: tx.transactionindex,
      transactionHash: getZBCAddress(Buffer.from(tx.transactionhash.toString(), 'base64'), 'ZTX'),
      transactionType: tx.transactiontype,
      txBody,
    };
  });
  return transactionList;
}

export function toTransactionListWallet(res: GetTransactionsResponse.AsObject, ownAddress: string): ZooTransactionsInterface {
  let transactionList = res.transactionsList.map(tx => {
    const bytes = Buffer.from(tx.transactionbodybytes.toString(), 'base64');
    const amount = readInt64(bytes, 0);
    const friendAddress = tx.senderaccountaddress == ownAddress ? tx.recipientaccountaddress : tx.senderaccountaddress;
    const type = tx.senderaccountaddress == ownAddress ? 'send' : 'receive';
    const txBody = getBodyBytes(tx);
    return {
      id: tx.id,
      address: friendAddress,
      ownAddress,
      type: type,
      timestamp: parseInt(tx.timestamp) * 1000,
      fee: parseInt(tx.fee),
      amount: parseInt(amount),
      blockId: tx.blockid,
      height: tx.height,
      transactionIndex: tx.transactionindex,
      transactionHash: getZBCAddress(Buffer.from(tx.transactionhash.toString(), 'base64'), 'ZTX'),
      txBody,
    };
  });
  return {
    total: parseInt(res.total),
    transactions: transactionList,
  };
}

export function getBodyBytes(tx: Transaction.AsObject) {
  return (
    tx.approvalescrowtransactionbody ||
    tx.claimnoderegistrationtransactionbody ||
    tx.multisignaturetransactionbody ||
    tx.noderegistrationtransactionbody ||
    tx.removeaccountdatasettransactionbody ||
    tx.removenoderegistrationtransactionbody ||
    tx.sendmoneytransactionbody ||
    {}
  );
}

export function toTransactionWallet(tx: Transaction.AsObject, ownAddress: string): ZooTransactionInterface {
  const bytes = Buffer.from(tx.transactionbodybytes.toString(), 'base64');
  const friendAddress = tx.senderaccountaddress == ownAddress ? tx.recipientaccountaddress : tx.senderaccountaddress;
  const type = tx.senderaccountaddress == ownAddress ? 'send' : 'receive';
  const amount = readInt64(bytes, 0);
  return {
    id: tx.id,
    address: friendAddress,
    type: type,
    timestamp: parseInt(tx.timestamp) * 1000,
    fee: parseInt(tx.fee),
    amount: parseInt(amount),
    blockId: tx.blockid,
    height: tx.height,
    transactionIndex: tx.transactionindex,
  };
}
