import Network from './Network';
import { Pagination, OrderBy } from '../grpc/model/pagination_pb';
import { BIP32Interface } from 'bip32';
import {
  EscrowApprovalInterface,
  escrowBuilder,
} from './helper/transaction-builder/escrow-transaction';
import {
  GetEscrowTransactionsRequest,
  GetEscrowTransactionRequest,
  Escrow,
  GetEscrowTransactionsResponse,
} from '../grpc/model/escrow_pb';
import { EscrowTransactionServiceClient } from '../grpc/service/escrow_pb_service';
import { PostTransactionRequest, PostTransactionResponse } from '../grpc/model/transaction_pb';
import { TransactionServiceClient } from '../grpc/service/transaction_pb_service';

export interface EscrowListParams {
  approverAddress?: string;
  blockHeightStart?: number;
  blockHeightEnd?: number;
  id?: string;
  statusList?: (0 | 1 | 2 | 3)[];
  pagination?: {
    limit?: number;
    page?: number;
    orderBy?: 0 | 1;
  };
}

function getList(params?: EscrowListParams): Promise<GetEscrowTransactionsResponse.AsObject> {
  return new Promise((resolve, reject) => {
    const networkIP = Network.selected;
    const request = new GetEscrowTransactionsRequest();

    if (params) {
      const {
        approverAddress,
        blockHeightStart,
        blockHeightEnd,
        id,
        statusList,
        pagination,
      } = params;
      if (approverAddress) request.setApproveraddress(approverAddress);
      if (blockHeightStart) request.setBlockheightstart(blockHeightStart);
      if (blockHeightEnd) request.setBlockheightend(blockHeightEnd);
      if (id) request.setId(id);
      if (statusList) request.setStatusesList(statusList);
      if (pagination) {
        const reqPagination = new Pagination();
        reqPagination.setLimit(pagination.limit || 10);
        reqPagination.setPage(pagination.page || 1);
        reqPagination.setOrderby(pagination.orderBy || OrderBy.ASC);
        request.setPagination(reqPagination);
      }
    }

    const client = new EscrowTransactionServiceClient(networkIP);
    client.getEscrowTransactions(request, (err, res) => {
      if (err) return reject(err.message);
      resolve(res?.toObject());
    });
  });
}

function get(id: string): Promise<Escrow.AsObject> {
  return new Promise((resolve, reject) => {
    const networkIP = Network.selected;
    const request = new GetEscrowTransactionRequest();
    request.setId(id);

    const client = new EscrowTransactionServiceClient(networkIP);
    client.getEscrowTransaction(request, (err, res) => {
      if (err) reject(err.message);
      resolve(res?.toObject());
    });
  });
}

function approval(
  data: EscrowApprovalInterface,
  seed: BIP32Interface,
): Promise<PostTransactionResponse.AsObject> {
  const txBytes = escrowBuilder(data, seed);
  return new Promise((resolve, reject) => {
    const networkIP = Network.selected;

    const request = new PostTransactionRequest();
    request.setTransactionbytes(txBytes);

    const client = new TransactionServiceClient(networkIP);
    client.postTransaction(request, (err, res) => {
      if (err) reject(err.message);
      resolve(res?.toObject());
    });
  });
}

export default { approval, get, getList };
