import Network from './Network';
import { GetMempoolTransactionRequest, GetMempoolTransactionsRequest } from '../grpc/model/mempool_pb';
import { Pagination, OrderBy } from '../grpc/model/pagination_pb';
import { MempoolServiceClient } from '../grpc/service/mempool_pb_service';
import { Address } from './helper/interfaces';
import { addressToBytes } from './helper/utils';
import { toZBCPendingTransaction, toZBCPendingTransactions } from './helper/wallet/Mempool';
import { ZBCTransaction, ZBCTransactions } from './helper/wallet/Transaction';
import { TransactionType } from '../grpc/model/transaction_pb';

export interface MempoolListParams {
  address?: Address;
  txType?: number;
  timestampStart?: string;
  timestampEnd?: string;
  pagination?: {
    limit?: number;
    page?: number;
    orderBy?: 0 | 1;
  };
}

function getList(params?: MempoolListParams): Promise<ZBCTransactions> {
  return new Promise((resolve, reject) => {
    const networkIP = Network.selected();
    const request = new GetMempoolTransactionsRequest();

    if (params) {
      const { address, timestampEnd, timestampStart, pagination } = params;

      if (address) request.setAddress(addressToBytes(address));
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

    const client = new MempoolServiceClient(networkIP.host);
    client.getMempoolTransactions(request, (err, res) => {
      if (err) {
        const { code, message, metadata } = err;
        reject({ code, message, metadata });
      }
      if (res) resolve(toZBCPendingTransactions(res.toObject(), params?.txType));
    });
  });
}

function get(id: string): Promise<ZBCTransaction> {
  return new Promise((resolve, reject) => {
    const networkIP = Network.selected();
    const request = new GetMempoolTransactionRequest();

    request.setId(id);

    const client = new MempoolServiceClient(networkIP.host);
    client.getMempoolTransaction(request, (err, res) => {
      if (err) {
        const { code, message, metadata } = err;
        reject({ code, message, metadata });
      }
      if (res) {
        const tx = res.toObject().transaction;
        if (tx !== undefined) resolve(toZBCPendingTransaction(tx));
      }
    });
  });
}

export default { get, getList };
