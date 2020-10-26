import { GetAccountDatasetsRequest, GetAccountDatasetRequest } from '../grpc/model/accountDataset_pb';
import { AccountDatasetServiceClient } from '../grpc/service/accountDataset_pb_service';
import { Pagination, OrderBy } from '../grpc/model/pagination_pb';
import Network from './Network';
import { PostTransactionRequest, PostTransactionResponse } from '../grpc/model/transaction_pb';
import { TransactionServiceClient } from '../grpc/service/transaction_pb_service';
import { setupDatasetBuilder, SetupDatasetInterface } from './helper/transaction-builder/setup-account-dataset';
import { BIP32Interface } from 'bip32';
import { RemoveDatasetInterface, removeDatasetBuilder } from './helper/transaction-builder/remove-account-dataset';
import { accountToBytes, errorDateMessage, validationTimestamp } from './helper/utils';
import { Account } from './helper/interfaces';
import { AccountDataset, AccountDatasets, toZBCDataset, toZBCDatasets } from './helper/wallet/AccountDataset';

export type SetupDatasetResponse = PostTransactionResponse.AsObject;
export type RemoveAccountDatasetResponse = PostTransactionResponse.AsObject;

export interface AccountDatasetListParams {
  property?: string;
  value?: string;
  setter?: Account;
  recipient?: Account;
  height?: number;
  pagination?: {
    limit?: number;
    page?: number;
    orderBy?: 0 | 1;
  };
}

export function getList(params?: AccountDatasetListParams): Promise<AccountDatasets> {
  return new Promise((resolve, reject) => {
    const networkIP = Network.selected();
    const request = new GetAccountDatasetsRequest();
    if (params) {
      const { property, value, setter, recipient, height, pagination } = params;
      if (property) request.setProperty(property);
      if (value) request.setValue(value);
      if (setter) request.setSetteraccountaddress(accountToBytes(setter));
      if (recipient) request.setRecipientaccountaddress(accountToBytes(recipient));
      if (height) request.setHeight(height);
      if (pagination) {
        const reqPagination = new Pagination();
        reqPagination.setLimit(pagination.limit || 10);
        reqPagination.setPage(pagination.page || 1);
        reqPagination.setOrderby(pagination.orderBy || OrderBy.DESC);
        request.setPagination(reqPagination);
      }
    }
    const client = new AccountDatasetServiceClient(networkIP.host);
    client.getAccountDatasets(request, (err, res) => {
      if (err) {
        const { code, message, metadata } = err;
        reject({ code, message, metadata });
      }
      if (res) resolve(toZBCDatasets(res.toObject()));
    });
  });
}

export function get(property: string, recipient: Account): Promise<AccountDataset> {
  return new Promise((resolve, reject) => {
    const networkIP = Network.selected();
    const request = new GetAccountDatasetRequest();
    request.setProperty(property);
    request.setRecipientaccountaddress(accountToBytes(recipient));
    const client = new AccountDatasetServiceClient(networkIP.host);
    client.getAccountDataset(request, (err, res) => {
      if (err) {
        const { code, message, metadata } = err;
        reject({ code, message, metadata });
      }
      if (res) resolve(toZBCDataset(res.toObject()));
    });
  });
}

export function setupDataset(data: SetupDatasetInterface, childSeed: BIP32Interface): Promise<SetupDatasetResponse> {
  return new Promise(async (resolve, reject) => {
    const networkIP = Network.selected();
    const bytes = setupDatasetBuilder(data, childSeed);
    const request = new PostTransactionRequest();
    request.setTransactionbytes(bytes);
    const validTimestamp = await validationTimestamp(bytes);
    if (validTimestamp) {
      const client = new TransactionServiceClient(networkIP.host);
      client.postTransaction(request, (err, res) => {
        if (err) {
          const { code, message, metadata } = err;
          reject({ code, message, metadata });
        }
        if (res) resolve(res.toObject());
      });
    } else {
      const { code, message, metadata } = errorDateMessage;
      reject({ code, message, metadata });
    }
  });
}

export function removeDataset(data: RemoveDatasetInterface, childseed: BIP32Interface): Promise<RemoveAccountDatasetResponse> {
  return new Promise(async (resolve, reject) => {
    const bytes = removeDatasetBuilder(data, childseed);
    const request = new PostTransactionRequest();
    request.setTransactionbytes(bytes);

    const networkIP = Network.selected();
    const validTimestamp = await validationTimestamp(bytes);
    if (validTimestamp) {
      const client = new TransactionServiceClient(networkIP.host);
      client.postTransaction(request, (err, res) => {
        if (err) {
          const { code, message, metadata } = err;
          reject({ code, message, metadata });
        }
        if (res) resolve(res.toObject());
      });
    } else {
      const { code, message, metadata } = errorDateMessage;
      reject({ code, message, metadata });
    }
  });
}

export default { getList, get, setupDataset, removeDataset };
