// Licensed to the Quasisoft Limited - Hong Kong under one or more agreements
// The Quasisoft Limited - Hong Kong licenses this file to you under MIT license.

import Network from './Network';
import { BIP32Interface } from 'bip32';
import { Address } from './helper/interfaces';
import { grpc } from '@improbable-eng/grpc-web';
import { addressToBytes } from './helper/utils';
import { Pagination, OrderBy } from '../grpc/model/pagination_pb';
import { TransactionServiceClient } from '../grpc/service/transaction_pb_service';
import { LiquidPaymentServiceClient } from '../grpc/service/liquidPayment_pb_service';
import { PostTransactionRequest, PostTransactionResponse } from '../grpc/model/transaction_pb';
import { GetLiquidTransactionsRequest, GetLiquidTransactionsResponse } from '../grpc/model/liquidPayment_pb';
import {
  LiquidTransactionsInterface,
  LiquidStopTransactionInterface,
  liquidTransactionBuilder,
  liquidStopTransactionBuilder,
} from './helper/transaction-builder/liquid-transaction';
import { toLiquidTransactions, parseLiquidTransaction, ZBCLiquidTransactions, ZBCLiquidTransaction } from './helper/wallet/Liquid';

export type LiquidTransactionsResponse = GetLiquidTransactionsResponse.AsObject;

export interface LiquidTransactionParams {
  id?: string;
  senderaddress?: Address;
  recipientaddress?: Address;
  status?: 0 | 1;
  latest?: number;
  pagination?: {
    limit?: number;
    page?: number;
    orderBy?: 0 | 1;
  };
}

function getList(params?: LiquidTransactionParams): Promise<ZBCLiquidTransactions> {
  return new Promise((resolve, reject) => {
    const request = new GetLiquidTransactionsRequest();

    if (params) {
      const { id, senderaddress, recipientaddress, status, pagination } = params;

      if (id) request.setId(id);
      if (senderaddress) request.setSenderaddress(addressToBytes(senderaddress));
      if (recipientaddress) request.setRecipientaddress(addressToBytes(recipientaddress));
      if (status) request.setStatus(status);
      if (pagination) {
        const reqPagination = new Pagination();
        reqPagination.setLimit(pagination.limit || 10);
        reqPagination.setPage(pagination.page || 1);
        reqPagination.setOrderby(pagination.orderBy || OrderBy.DESC);
        request.setPagination(reqPagination);
      }
    }

    Network.request(LiquidPaymentServiceClient, 'getLiquidTransactions', request)
      .catch(err => {
        const { code, message, metadata } = err;
        reject({ code, message, metadata });
      })
      .then(res => {
        resolve(toLiquidTransactions(res.toObject()));
      });
  });
}

function get(id: string): Promise<ZBCLiquidTransaction> {
  return new Promise((resolve, reject) => {
    const request = new GetLiquidTransactionsRequest();
    request.setId(id);
    Network.request(LiquidPaymentServiceClient, 'getLiquidTransactions', request)
      .catch(err => {
        const { code, message, metadata } = err;
        reject({ code, message, metadata });
      })
      .then(res => {
        resolve(parseLiquidTransaction(res.toObject()));
      });
  });
}

function sendLiquid(data: LiquidTransactionsInterface, childSeed: BIP32Interface): Promise<PostTransactionResponse.AsObject> {
  return new Promise(async (resolve, reject) => {
    const bytes = liquidTransactionBuilder(data, childSeed);

    const request = new PostTransactionRequest();
    request.setTransactionbytes(bytes);

    Network.request(TransactionServiceClient, 'postTransaction', request)
      .catch(err => {
        const { code, message, metadata } = err;
        if (code == grpc.Code.Internal) resolve({});
        reject({ code, message, metadata });
      })
      .then(res => {
        resolve(res ? res.toObject() : null);
      });
  });
}

function sendLiquidStop(data: LiquidStopTransactionInterface, childSeed: BIP32Interface): Promise<PostTransactionResponse.AsObject> {
  return new Promise(async (resolve, reject) => {
    //build the tx into bytes
    const bytes = liquidStopTransactionBuilder(data, childSeed);

    const request = new PostTransactionRequest();
    request.setTransactionbytes(bytes);

    Network.request(TransactionServiceClient, 'postTransaction', request)
      .catch(err => {
        const { code, message, metadata } = err;
        if (code == grpc.Code.Internal) resolve({});
        reject({ code, message, metadata });
      })
      .then(res => {
        resolve(res ? res.toObject() : null);
      });
  });
}

export default { get, getList, sendLiquid, sendLiquidStop };
