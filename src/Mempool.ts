import Network from './Network';
import {
  GetMempoolTransactionRequest,
  GetMempoolTransactionsResponse,
  GetMempoolTransactionsRequest,
  MempoolTransaction,
} from '../grpc/model/mempool_pb';
import { Pagination, OrderBy } from '../grpc/model/pagination_pb';
import { MempoolServiceClient } from '../grpc/service/mempool_pb_service';

export interface MempoolListParams {
  address?: string;
  timestampStart?: string;
  timestampEnd?: string;
  pagination?: {
    limit?: number;
    page?: number;
    orderBy?: 0 | 1;
  };
}

function get(params?: MempoolListParams): Promise<GetMempoolTransactionsResponse.AsObject> {
  return new Promise((resolve, reject) => {
    const networkIP = Network.selected;
    const request = new GetMempoolTransactionsRequest();

    if (params) {
      const { address, timestampEnd, timestampStart, pagination } = params;

      if (address) request.setAddress(address);
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

    const client = new MempoolServiceClient(networkIP);
    client.getMempoolTransactions(request, (err, res) => {
      if (err) reject(err);
      if (res) resolve(res.toObject());
    });
  });
}

function getOne(id: string): Promise<MempoolTransaction.AsObject> {
  return new Promise((resolve, reject) => {
    const networkIP = Network.selected;
    const request = new GetMempoolTransactionRequest();
    request.setId(id);

    const client = new MempoolServiceClient(networkIP);
    client.getMempoolTransaction(request, (err, res) => {
      if (err) reject(err.message);
      if (res) resolve(res.toObject().transaction);
    });
  });
}

export default { get, getOne };
