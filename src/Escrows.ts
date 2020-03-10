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

function get(
  address: string,
  page: number,
  limit: number,
): Promise<GetEscrowTransactionsResponse.AsObject> {
  return new Promise((resolve, reject) => {
    const networkIP = Network.selected;

    const request = new GetEscrowTransactionsRequest();
    const pagination = new Pagination();
    pagination.setLimit(limit);
    pagination.setPage(page);
    pagination.setOrderby(OrderBy.ASC);
    request.setApproveraddress(address);
    request.setPagination(pagination);

    const client = new EscrowTransactionServiceClient(networkIP);
    client.getEscrowTransactions(request, (err, res) => {
      if (err) return reject(err.message);
      resolve(res?.toObject());
    });
  });
}

function getOne(id: string): Promise<Escrow.AsObject> {
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

export default { approval, get, getOne };
