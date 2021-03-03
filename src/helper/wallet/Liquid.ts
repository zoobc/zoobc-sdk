// Licensed to the Quasisoft Limited - Hong Kong under one or more agreements
// The Quasisoft Limited - Hong Kong licenses this file to you under MIT license.

import { Address } from '../interfaces';
import { parseAddress } from '../utils';
import { GetLiquidTransactionsResponse, LiquidPayment } from '../../../grpc/model/liquidPayment_pb';

export interface ZBCLiquidTransactions {
  total: number;
  liquidtransactionsList: ZBCLiquidTransaction[];
}

export interface ZBCLiquidTransaction {
  id?: string;
  sender: Address;
  senderAlias?: string;
  recipient: Address;
  recipientAlias?: string;
  amount?: number;
  appliedTime?: string;
  blockHeight?: number;
  completeMinutes?: number;
  latest?: boolean;
  status?: number;
}

export function toLiquidTransaction(transaction: LiquidPayment.AsObject): ZBCLiquidTransaction {
  return {
    id: transaction.id,
    sender: parseAddress(transaction.senderaddress),
    recipient: parseAddress(transaction.recipientaddress),
    amount: parseFloat(transaction.amount),
    appliedTime: transaction.appliedtime,
    blockHeight: transaction.blockheight,
    completeMinutes: parseInt(transaction.completeminutes),
    latest: transaction.latest,
    status: transaction.status,
  };
}

export function toLiquidTransactions(transactions: GetLiquidTransactionsResponse.AsObject): ZBCLiquidTransactions {
  const list = transactions.liquidtransactionsList.map(tx => toLiquidTransaction(tx));
  return {
    total: parseInt(transactions.total),
    liquidtransactionsList: list,
  };
}

export function parseLiquidTransaction(transactions: GetLiquidTransactionsResponse.AsObject): ZBCLiquidTransaction {
  const list = transactions.liquidtransactionsList.map(tx => toLiquidTransaction(tx));
  return list[0];
}
