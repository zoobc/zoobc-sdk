import Network from './Network';
import { RpcOptions } from '@improbable-eng/grpc-web/dist/typings/client';
import { TransportFactory } from '@improbable-eng/grpc-web/dist/typings/transports/Transport';
import {
  GetMempoolTransactionRequest,
  GetMempoolTransactionsResponse,
  GetMempoolTransactionsRequest,
  GetMempoolTransactionResponse,
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
  transport?: TransportFactory;
}

function getList(params?: MempoolListParams): Promise<GetMempoolTransactionsResponse.AsObject> {
  return new Promise((resolve, reject) => {
    const networkIP = Network.selected();
    const request = new GetMempoolTransactionsRequest();
    const clientOptions: RpcOptions = {};

    if (params) {
      const { address, timestampEnd, timestampStart, pagination, transport } = params;

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
      if (transport) clientOptions.transport = transport;
    }

    const client = new MempoolServiceClient(networkIP.host, clientOptions);
    client.getMempoolTransactions(request, (err, res) => {
      if (err) reject(err);
      if (res) resolve(res.toObject());
    });
  });
}

function get(id: string, transport?: TransportFactory): Promise<GetMempoolTransactionResponse.AsObject> {
  return new Promise((resolve, reject) => {
    const networkIP = Network.selected();
    const request = new GetMempoolTransactionRequest();
    const clientOptions: RpcOptions = {};

    request.setId(id);
    if (transport) clientOptions.transport = transport;

    const client = new MempoolServiceClient(networkIP.host, clientOptions);
    client.getMempoolTransaction(request, (err, res) => {
      if (err) reject(err.message);
      if (res) resolve(res.toObject());
    });
  });
}

export default { get, getList };
