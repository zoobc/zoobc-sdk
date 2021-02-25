// Licensed to the Quasisoft Limited - Hong Kong under one or more agreements
// The Quasisoft Limited - Hong Kong licenses this file to you under MIT license.

import Network from './Network';
import { Pagination, OrderBy } from '../grpc/model/pagination_pb';
import { LiquidPaymentServiceClient } from '../grpc/service/liquidPayment_pb_service';
import { PostTransactionRequest, PostTransactionResponse } from '../grpc/model/transaction_pb';
import { GetLiquidTransactionsResponse, GetLiquidTransactionsRequest } from '../grpc/model/liquidPayment_pb';
import { TransactionServiceClient } from '../grpc/service/transaction_pb_service';
import { BIP32Interface } from 'bip32';
import { addressToBytes, errorDateMessage } from './helper/utils';
import { LiquidTransactionsInterface, liquidTransactionBuilder } from './helper/transaction-builder/liquid-transaction';
import { Address } from './helper/interfaces';
import { toZBCTransaction, toZBCTransactions, ZBCTransaction, ZBCTransactions } from './helper/wallet/Transaction';
import { isTimestampValid } from './helper/timestamp-validation';
import { grpc } from '@improbable-eng/grpc-web';

export type PostTransactionResponses = PostTransactionResponse.AsObject;

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

function getList(params?: LiquidTransactionParams): Promise<ZBCTransactions> {
  return new Promise((resolve, reject) => {
    const kevin = new GetLiquidTransactionsRequest();
    console.log('kevin', kevin);
    //   const request = new GetLiquidTransactionsRequest();
    //   // const networkIP = Network.selected();

    //   if (params) {
    //     const { id, senderaddress, recipientaddress, status, pagination } = params;

    //     if (id) request.setId(id);
    //     if (senderaddress) request.setSenderaddress(addressToBytes(senderaddress));
    //     if (recipientaddress) request.setRecipientaddress(addressToBytes(recipientaddress));
    //     if (status) request.setStatus(status);
    //     if (pagination) {
    //       const reqPagination = new Pagination();
    //       reqPagination.setLimit(pagination.limit || 10);
    //       reqPagination.setPage(pagination.page || 1);
    //       reqPagination.setOrderby(pagination.orderBy || OrderBy.DESC);
    //       request.setPagination(reqPagination);
    //     }
    //   }

    //   Network.request(LiquidPaymentServiceClient, 'getLiquidTransaction', request)
    //     .catch(err => {
    //       const { code, message, metadata } = err;
    //       reject({ code, message, metadata });
    //     })
    //     .then(res => {
    //       resolve(toZBCTransactions(res.toObject()));
    //     });

    //   /*const client = new TransactionServiceClient(networkIP.host);
    //   client.getTransactions(request, (err, res) => {
    //     if (err) {
    //       const { code, message, metadata } = err;
    //       reject({ code, message, metadata });
    //     }
    //     if (res) resolve(toZBCTransactions(res.toObject()));
    //   });*/
  });
}

function get(id: string): Promise<ZBCTransaction> {
  return new Promise((resolve, reject) => {
    //   // const networkIP = Network.selected();
    //   const request = new GetLiquidTransactionsRequest();
    //   request.setId(id);
    //   Network.request(LiquidPaymentServiceClient, 'getTransaction', request)
    //     .catch(err => {
    //       const { code, message, metadata } = err;
    //       reject({ code, message, metadata });
    //     })
    //     .then(res => {
    //       resolve(toZBCTransaction(res.toObject()));
    //     });
    //   /*const client = new TransactionServiceClient(networkIP.host);
    //   client.getTransaction(request, (err, res) => {
    //     if (err) {
    //       const { code, message, metadata } = err;
    //       reject({ code, message, metadata });
    //     }
    //     if (res) resolve(toZBCTransaction(res.toObject()));
    //   });*/
  });
}

function postTransaction(data: LiquidTransactionsInterface, childSeed: BIP32Interface): Promise<PostTransactionResponse.AsObject> {
  return new Promise(async (resolve, reject) => {
    const bytes = liquidTransactionBuilder(data, childSeed);
    const request = new PostTransactionRequest();
    request.setTransactionbytes(bytes);
    // const networkIP = Network.selected();
    const validTimestamp = await isTimestampValid(bytes);
    if (validTimestamp) {
      Network.request(TransactionServiceClient, 'postTransaction', request)
        .catch(err => {
          const { code, message, metadata } = err;
          if (code == grpc.Code.Internal) resolve({});
          reject({ code, message, metadata });
        })
        .then(res => {
          resolve(res.toObject());
        });

      /*const client = new TransactionServiceClient(networkIP.host);
      client.postTransaction(request, (err, res) => {
        if (err) {
          const { code, message, metadata } = err;
          reject({ code, message, metadata });
        }
        if (res) resolve(res.toObject());
      });*/
    } else {
      const { code, message, metadata } = errorDateMessage;
      reject({ code, message, metadata });
    }
  });
}

export default { get, getList, postTransaction };
