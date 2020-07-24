import { GetAccountLedgersResponse } from '../grpc/model/accountLedger_pb';
export declare type AccountLedgersResponse = GetAccountLedgersResponse.AsObject;
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
    };
}
export declare function getList(params?: AccountLedgerListParams): Promise<AccountLedgersResponse>;
declare const _default: {
    getList: typeof getList;
};
export default _default;
