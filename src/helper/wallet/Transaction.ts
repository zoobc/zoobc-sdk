import { getZBCAddress, parseAddress } from '../utils';
import { GetTransactionsResponse, Transaction } from '../../../grpc/model/transaction_pb';
import { Address } from '../interfaces';

export interface ZBCTransactions {
  total: number;
  transactions: ZBCTransaction[];
}

export interface ZBCTransaction {
  id?: string;
  sender: Address;
  senderAlias?: string;
  recipient: Address;
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
  approverAddress?: Address;
  commission?: number;
  timeout?: number;
  instruction?: string;
}

export function toZBCTransaction(transaction: Transaction.AsObject): ZBCTransaction {
  const txBody = getBodyBytes(transaction);
  return {
    id: transaction.id,
    sender: parseAddress(transaction.senderaccountaddress),
    recipient: parseAddress(transaction.recipientaccountaddress),
    timestamp: parseInt(transaction.timestamp) * 1000,
    fee: parseInt(transaction.fee),
    blockId: transaction.blockid,
    height: transaction.height,
    transactionIndex: transaction.transactionindex,
    transactionHash: getZBCAddress(Buffer.from(transaction.transactionhash.toString(), 'base64'), 'ZTX'),
    transactionType: transaction.transactiontype,
    multisig: transaction.multisigchild,
    txBody,
  };
}

export function toZBCTransactions(transactions: GetTransactionsResponse.AsObject): ZBCTransactions {
  const list = transactions.transactionsList.map(tx => toZBCTransaction(tx));
  return {
    total: parseInt(transactions.total),
    transactions: list,
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
    tx.feevotecommittransactionbody ||
    tx.feevoterevealtransactionbody ||
    tx.liquidpaymentstoptransactionbody ||
    tx.liquidpaymenttransactionbody ||
    tx.updatenoderegistrationtransactionbody ||
    {}
  );
}
