import { GetAccountLedgersRequest, GetAccountLedgersResponse } from '../grpc/model/accountLedger_pb';
import { AccountLedgerServiceClient } from '../grpc/service/accountLedger_pb_service';
import { Pagination, OrderBy } from '../grpc/model/pagination_pb';
import Network from './Network';

export type AccountLedgersResponse = GetAccountLedgersResponse.AsObject;

export interface AccountLedgerListParams {
  accountAddress?: string;
  eventType?: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10;
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

export function getList(params?: AccountLedgerListParams): Promise<AccountLedgersResponse> {
  return new Promise((resolve, reject) => {
    const networkIP = Network.selected();
    const request = new GetAccountLedgersRequest();
    if (params) {
      const { accountAddress, eventType, transactionId, timeStampStart, timeStampEnd, pagination } = params;
      if (accountAddress) request.setAccountaddress(accountAddress);
      if (eventType) request.setEventtype(eventType);
      if (transactionId) request.setTransactionid(transactionId);
      if (timeStampStart) request.setTimestampstart(timeStampStart);
      if (timeStampEnd) request.setTimestampend(timeStampEnd);
      if (pagination) {
        const reqPagination = new Pagination();
        reqPagination.setOrderfield(pagination.orderField || '');
        reqPagination.setLimit(pagination.limit || 10);
        reqPagination.setPage(pagination.page || 1);
        reqPagination.setOrderby(pagination.orderBy || OrderBy.DESC);
        request.setPagination(reqPagination);
      }
    }
    const client = new AccountLedgerServiceClient(networkIP.host);
    client.getAccountLedgers(request, (err, res) => {
      if (err) {
        const { code, message, metadata } = err;
        reject({ code, message, metadata });
      }
      if (res) resolve(res.toObject());
    });
  });
}

export default { getList };
