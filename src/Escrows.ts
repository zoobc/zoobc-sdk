import Network from './Network';
import { Pagination, OrderBy } from '../grpc/model/pagination_pb';
import { BIP32Interface } from 'bip32';
import { EscrowApprovalInterface, escrowBuilder } from './helper/transaction-builder/escrow-transaction';
import { GetEscrowTransactionsRequest, GetEscrowTransactionRequest } from '../grpc/model/escrow_pb';
import { EscrowTransactionServiceClient } from '../grpc/service/escrow_pb_service';
import { PostTransactionRequest, PostTransactionResponse } from '../grpc/model/transaction_pb';
import { TransactionServiceClient } from '../grpc/service/transaction_pb_service';
import { accountToBytes, errorDateMessage, validationTimestamp } from './helper/utils';
import { Account } from './helper/interfaces';
import { Escrows, toZBCEscrows, Escrow, toZBCEscrow } from './helper/wallet/Escrows';

export type ApprovalEscrowTransactionResponse = PostTransactionResponse.AsObject;

export interface EscrowListParams {
  approverAddress?: Account;
  sender?: Account;
  recipient?: Account;
  blockHeightStart?: number;
  blockHeightEnd?: number;
  id?: string;
  statusList?: (0 | 1 | 2 | 3)[];
  pagination?: {
    limit?: number;
    page?: number;
    orderBy?: 0 | 1;
    orderField?: string;
  };
  latest?: boolean;
}

function getList(params?: EscrowListParams): Promise<Escrows> {
  return new Promise((resolve, reject) => {
    const networkIP = Network.selected();
    const request = new GetEscrowTransactionsRequest();

    if (params) {
      const { approverAddress, blockHeightStart, blockHeightEnd, id, statusList, pagination, sender, recipient, latest } = params;
      if (approverAddress) request.setApproveraddress(accountToBytes(approverAddress));
      if (blockHeightStart) request.setBlockheightstart(blockHeightStart);
      if (blockHeightEnd) request.setBlockheightend(blockHeightEnd);
      if (id) request.setId(id);
      if (statusList) request.setStatusesList(statusList);
      if (sender) request.setSenderaddress(accountToBytes(sender));
      if (recipient) request.setRecipientaddress(accountToBytes(recipient));
      if (latest) request.setLatest(latest);
      if (pagination) {
        const reqPagination = new Pagination();
        reqPagination.setLimit(pagination.limit || 10);
        reqPagination.setPage(pagination.page || 1);
        reqPagination.setOrderby(pagination.orderBy || OrderBy.DESC);
        reqPagination.setOrderfield(pagination.orderField || 'id');
        request.setPagination(reqPagination);
      }
    }

    const client = new EscrowTransactionServiceClient(networkIP.host);
    client.getEscrowTransactions(request, (err, res) => {
      if (err) {
        const { code, message, metadata } = err;
        reject({ code, message, metadata });
      }
      if (res) resolve(toZBCEscrows(res.toObject()));
    });
  });
}

function get(id: string): Promise<Escrow> {
  return new Promise((resolve, reject) => {
    const networkIP = Network.selected();
    const request = new GetEscrowTransactionRequest();
    request.setId(id);

    const client = new EscrowTransactionServiceClient(networkIP.host);
    client.getEscrowTransaction(request, (err, res) => {
      if (err) {
        const { code, message, metadata } = err;
        reject({ code, message, metadata });
      }
      if (res) resolve(toZBCEscrow(res.toObject()));
    });
  });
}

function approval(data: EscrowApprovalInterface, seed: BIP32Interface): Promise<ApprovalEscrowTransactionResponse> {
  const txBytes = escrowBuilder(data, seed);
  return new Promise(async (resolve, reject) => {
    const networkIP = Network.selected();

    const request = new PostTransactionRequest();
    request.setTransactionbytes(txBytes);

    const validTimestamp = await validationTimestamp(txBytes);
    if (validTimestamp) {
      const client = new TransactionServiceClient(networkIP.host);
      client.postTransaction(request, (err, res) => {
        if (err) {
          const { code, message, metadata } = err;
          reject({ code, message, metadata });
        }
        resolve(res?.toObject());
      });
    } else {
      const { code, message, metadata } = errorDateMessage;
      reject({ code, message, metadata });
    }
  });
}

export default { approval, get, getList };
