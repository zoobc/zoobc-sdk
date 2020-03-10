import Network from './Network';
import {
  GetTransactionsRequest,
  PostTransactionRequest,
  PostTransactionResponse,
  GetTransactionsResponse,
  GetTransactionRequest,
  Transaction,
} from '../grpc/model/transaction_pb';
import { Pagination, OrderBy } from '../grpc/model/pagination_pb';
import { TransactionServiceClient } from '../grpc/service/transaction_pb_service';
import { SendMoneyInterface, sendMoneyBuilder } from './helper/transaction-builder/send-money';
import { BIP32Interface } from 'bip32';

export interface ZooTransactionsInterface {
  total: number;
  transactions: ZooTransactionInterface[];
}

export interface ZooTransactionInterface {
  id: string;
  address: string;
  sender: string;
  recipient: string;
  timestamp: number;
  fee: number;
  type: string;
  amount: number;
  blockId: string;
  height: number;
  transactionIndex: number;
}

function get(
  address: string,
  page: number,
  limit: number,
): Promise<GetTransactionsResponse.AsObject> {
  return new Promise((resolve, reject) => {
    const networkIP = Network.selected;

    const request = new GetTransactionsRequest();
    const pagination = new Pagination();
    pagination.setLimit(limit);
    pagination.setPage(page);
    pagination.setOrderby(OrderBy.DESC);
    request.setAccountaddress(address);
    request.setPagination(pagination);
    request.setTransactiontype(1);

    const client = new TransactionServiceClient(networkIP);
    client.getTransactions(request, (err, res) => {
      if (err) reject(err);
      if (res) resolve(res.toObject());
    });
  });
}

function getOne(id: string): Promise<Transaction.AsObject> {
  return new Promise((resolve, reject) => {
    const networkIP = Network.selected;
    const request = new GetTransactionRequest();
    request.setId(id);

    const client = new TransactionServiceClient(networkIP);
    client.getTransaction(request, (err, res) => {
      if (err) reject(err.message);
      if (res) resolve(res.toObject());
    });
  });
}

function sendMoney(
  data: SendMoneyInterface,
  seed: BIP32Interface,
): Promise<PostTransactionResponse.AsObject> {
  const txBytes = sendMoneyBuilder(data, seed);

  return new Promise((resolve, reject) => {
    const networkIP = Network.selected;

    const request = new PostTransactionRequest();
    request.setTransactionbytes(txBytes);

    const client = new TransactionServiceClient(networkIP);
    client.postTransaction(request, (err, res) => {
      if (err) reject(err);
      if (res) resolve(res.toObject());
    });
  });
}

export default { sendMoney, get, getOne };
