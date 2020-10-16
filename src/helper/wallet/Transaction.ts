import { readInt64, getZBCAddress } from '../utils';
import { GetTransactionsResponse, Transaction, TransactionType } from '../../../grpc/model/transaction_pb';

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

export interface ZBCTransactions {
  total: number;
  transactions: ZBCTransaction[];
}

export interface ZBCTransaction {
  id?: string;
  sender: string;
  senderAlias?: string;
  recipient: string;
  recipientAlias?: string;
  timestamp: number;
  fee: number;
  blockId?: string;
  height?: number;
  transactionIndex?: number;
  transactionHash?: string;
  transactionType?: number;
  txBody?: any;
  escrow?: boolean;
  escrowStatus?: number;
  multisig?: boolean;
  approverAddress?: string;
  commission?: number;
  timeout?: number;
  instruction?: string;
}

export function toZBCTransactions(transactions: Array<Transaction.AsObject>): ZBCTransaction[] {
  let transactionList: ZBCTransaction[] = transactions.map(tx => {
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
  });
  return {
    total: parseInt(res.total),
    transactions: transactionList,
  };
}

function getBodyBytes(tx: Transaction.AsObject) {
  return (
    tx.approvalescrowtransactionbody ||
    tx.claimnoderegistrationtransactionbody ||
    tx.multisignaturetransactionbody ||
    tx.noderegistrationtransactionbody ||
    tx.setupaccountdatasettransactionbody ||
    tx.removeaccountdatasettransactionbody ||
    tx.feevotecommittransactionbody ||
    tx.feevoterevealtransactionbody ||
    tx.removenoderegistrationtransactionbody ||
    tx.sendmoneytransactionbody ||
    tx.updatenoderegistrationtransactionbody ||
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
