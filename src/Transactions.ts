import Network from './Network';
import {
  GetTransactionsRequest,
  PostTransactionRequest,
  PostTransactionResponse,
  GetTransactionRequest,
  GetTransactionMinimumFeeResponse,
} from '../grpc/model/transaction_pb';
import { Pagination, OrderBy } from '../grpc/model/pagination_pb';
import { TransactionServiceClient } from '../grpc/service/transaction_pb_service';
import { SendMoneyInterface, sendMoneyBuilder } from './helper/transaction-builder/send-money';
import { BIP32Interface } from 'bip32';
import { addressToBytes, errorDateMessage, validationTimestamp } from './helper/utils';
import { Address } from './helper/interfaces';
import { toZBCTransaction, toZBCTransactions, ZBCTransaction, ZBCTransactions } from './helper/wallet/Transaction';

export type PostTransactionResponses = PostTransactionResponse.AsObject;
export type TransactionMinimumFeeResponse = GetTransactionMinimumFeeResponse.AsObject;

export interface TransactionListParams {
  address?: Address;
  height?: number;
  transactionType?: number;
  timestampStart?: string;
  timestampEnd?: string;
  pagination?: {
    limit?: number;
    page?: number;
    orderBy?: 0 | 1;
  };
}

function getList(params?: TransactionListParams): Promise<ZBCTransactions> {
  return new Promise((resolve, reject) => {
    const request = new GetTransactionsRequest();
    // const networkIP = Network.selected();

    if (params) {
      const { address, height, transactionType, timestampStart, timestampEnd, pagination } = params;

      if (address) request.setAccountaddress(addressToBytes(address));
      if (height) request.setHeight(height);
      if (transactionType) request.setTransactiontype(transactionType);
      if (timestampStart) request.setTimestampstart(timestampStart);
      if (timestampEnd) request.setTimestampend(timestampEnd);
      if (pagination) {
        const reqPagination = new Pagination();
        reqPagination.setLimit(pagination.limit || 10);
        reqPagination.setPage(pagination.page || 1);
        reqPagination.setOrderby(pagination.orderBy || OrderBy.DESC);
        request.setPagination(reqPagination);
      }
    }

    Network.request(TransactionServiceClient, 'getTransactions', request)
      .catch(err => {
        const { code, message, metadata } = err;
        reject({ code, message, metadata });
      })
      .then(res => {
        resolve(toZBCTransactions(res.toObject()));
      });

    /*const client = new TransactionServiceClient(networkIP.host);
    client.getTransactions(request, (err, res) => {
      if (err) {
        const { code, message, metadata } = err;
        reject({ code, message, metadata });
      }
      if (res) resolve(toZBCTransactions(res.toObject()));
    });*/
  });
}

function get(id: string): Promise<ZBCTransaction> {
  return new Promise((resolve, reject) => {
    // const networkIP = Network.selected();
    const request = new GetTransactionRequest();
    request.setId(id);

    Network.request(TransactionServiceClient, 'getTransaction', request)
      .catch(err => {
        const { code, message, metadata } = err;
        reject({ code, message, metadata });
      })
      .then(res => {
        resolve(toZBCTransaction(res.toObject()));
      });

    /*const client = new TransactionServiceClient(networkIP.host);
    client.getTransaction(request, (err, res) => {
      if (err) {
        const { code, message, metadata } = err;
        reject({ code, message, metadata });
      }
      if (res) resolve(toZBCTransaction(res.toObject()));
    });*/
  });
}

function sendMoney(data: SendMoneyInterface, seed: BIP32Interface): Promise<PostTransactionResponses> {
  const txBytes = sendMoneyBuilder(data, seed);

  return new Promise(async (resolve, reject) => {
    // const networkIP = Network.selected();

    const request = new PostTransactionRequest();
    request.setTransactionbytes(txBytes);
    const validTimestamp = await validationTimestamp(txBytes);
    if (validTimestamp) {
      Network.request(TransactionServiceClient, 'postTransaction', request)
        .catch(err => {
          const { code, message, metadata } = err;
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

function post(txBytes: Buffer): Promise<PostTransactionResponses> {
  return new Promise(async (resolve, reject) => {
    // const networkIP = Network.selected();

    const request = new PostTransactionRequest();
    request.setTransactionbytes(txBytes);
    const validTimestamp = await validationTimestamp(txBytes);
    if (validTimestamp) {
      Network.request(TransactionServiceClient, 'postTransaction', request)
        .catch(err => {
          const { code, message, metadata } = err;
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

export default { sendMoney, get, getList, post };
