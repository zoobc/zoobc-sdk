// Licensed to the Quasisoft Limited - Hong Kong under one or more agreements
// The Quasisoft Limited - Hong Kong licenses this file to you under MIT license.

import { getTxTypeString, getZBCAddress, parseAddress } from '../utils';
import { GetTransactionsResponse, Transaction, TransactionType } from '../../../grpc/model/transaction_pb';
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
  transactionTypeString?: string;
  txBody?: any;
  escrow?: any;
  escrowStatus?: number;
  multisig?: boolean;
  approverAddress?: Address;
  commission?: number;
  timeout?: number;
  instruction?: string;
  message?: string;
}

export function toZBCTransaction(transaction: Transaction.AsObject): ZBCTransaction {
  let txBody = getBodyBytes(transaction);

  const nodeManagementTxType =
    transaction.transactiontype == TransactionType.NODEREGISTRATIONTRANSACTION ||
    transaction.transactiontype == TransactionType.UPDATENODEREGISTRATIONTRANSACTION ||
    transaction.transactiontype == TransactionType.REMOVENODEREGISTRATIONTRANSACTION ||
    transaction.transactiontype == TransactionType.CLAIMNODEREGISTRATIONTRANSACTION ||
    transaction.transactiontype == TransactionType.LIQUIDPAYMENTTRANSACTION;
  if (nodeManagementTxType) {
    const hasNodePublicKey = txBody.nodepublickey;
    const hasAccountAddress = txBody.accountaddress;
    if (hasNodePublicKey) {
      const buffer = Buffer.from(txBody.nodepublickey.toString(), 'base64');
      const pubkey = getZBCAddress(buffer, 'ZNK');
      txBody.nodepublickey = pubkey;
    }
    if (hasAccountAddress) {
      const accountAddress = parseAddress(txBody.accountaddress);
      txBody.accountaddress = accountAddress.value;
    }
  }

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
    transactionTypeString: getTxTypeString(transaction.transactiontype),
    multisig: transaction.multisigchild,
    escrow: transaction.escrow,
    message: Buffer.from(transaction.message.toString(), 'base64').toString(),
    txBody,
  };
}

export function toZBCTransactions(transactions: GetTransactionsResponse.AsObject): ZBCTransactions {
  const list = transactions && transactions.transactionsList ? transactions.transactionsList.map(tx => toZBCTransaction(tx)) : [];
  return {
    total: parseInt(transactions.total),
    transactions: list,
  };
}

function getBodyBytes(tx: Transaction.AsObject): any {
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
    tx.sendzbctransactionbody ||
    tx.feevotecommittransactionbody ||
    tx.feevoterevealtransactionbody ||
    tx.liquidpaymentstoptransactionbody ||
    tx.liquidpaymenttransactionbody ||
    tx.updatenoderegistrationtransactionbody ||
    {}
  );
}
