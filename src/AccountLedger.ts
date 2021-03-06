// Licensed to the Quasisoft Limited - Hong Kong under one or more agreements
// The Quasisoft Limited - Hong Kong licenses this file to you under MIT license.

import { GetAccountLedgersRequest } from '../grpc/model/accountLedger_pb';
import { AccountLedgerServiceClient } from '../grpc/service/accountLedger_pb_service';
import { Pagination, OrderBy } from '../grpc/model/pagination_pb';
import Network from './Network';
import { addressToBytes } from './helper/utils';
import { Address } from './helper/interfaces';
import { AccountLedgerList, toZBCAccountLedger } from './helper/wallet/AccountLedger';

export interface AccountLedgerListParams {
  address?: Address;
  eventType?: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13 | 14 | 15 | 16;
  transactionId?: string;
  timeStampStart?: number;
  timeStampEnd?: number;
  pagination?: {
    limit?: number;
    page?: number;
    orderBy?: 0 | 1;
    orderField?: string;
  };
}

export function getList(params?: AccountLedgerListParams): Promise<AccountLedgerList> {
  return new Promise((resolve, reject) => {
    // const networkIP = Network.selected();
    const request = new GetAccountLedgersRequest();
    if (params) {
      const { address, eventType, transactionId, timeStampStart, timeStampEnd, pagination } = params;
      if (address) request.setAccountaddress(addressToBytes(address));
      if (eventType) request.setEventtype(eventType);
      if (transactionId) request.setTransactionid(transactionId);
      if (timeStampStart) request.setTimestampstart(timeStampStart);
      if (timeStampEnd) request.setTimestampend(timeStampEnd);
      if (pagination) {
        const reqPagination = new Pagination();
        reqPagination.setOrderfield(pagination.orderField || 'timestamp');
        reqPagination.setLimit(pagination.limit || 10);
        reqPagination.setPage(pagination.page || 1);
        reqPagination.setOrderby(pagination.orderBy || OrderBy.DESC);
        request.setPagination(reqPagination);
      }
    }

    Network.request(AccountLedgerServiceClient, 'getAccountLedgers', request)
      .catch(err => {
        const { code, message, metadata } = err;
        reject({ code, message, metadata });
      })
      .then(res => {
        resolve(toZBCAccountLedger(res.toObject()));
      });

    /*const client = new AccountLedgerServiceClient(networkIP.host);
    client.getAccountLedgers(request, (err, res) => {
      if (err) {
        const { code, message, metadata } = err;
        reject({ code, message, metadata });
      }

      if (res) resolve(toZBCAccountLedger(res.toObject()));
    });*/
  });
}

export default { getList };
