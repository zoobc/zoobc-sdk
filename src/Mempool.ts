import Network from './Network';
import {
  GetMempoolTransactionRequest,
  GetMempoolTransactionsResponse,
  GetMempoolTransactionsRequest,
  MempoolTransaction,
} from '../grpc/model/mempool_pb';
import { Pagination, OrderBy } from '../grpc/model/pagination_pb';
import { MempoolServiceClient } from '../grpc/service/mempool_pb_service';

function get(address: string, page: number, limit: number): Promise<GetMempoolTransactionsResponse.AsObject> {
  return new Promise((resolve, reject) => {
    const networkIP = Network.selected;

    const request = new GetMempoolTransactionsRequest();
    const pagination = new Pagination();
    pagination.setLimit(limit);
    pagination.setPage(page);
    pagination.setOrderby(OrderBy.DESC);
    request.setAddress(address);
    request.setPagination(pagination);

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
