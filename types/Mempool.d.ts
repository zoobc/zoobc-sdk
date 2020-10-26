import { GetMempoolTransactionsResponse, MempoolTransaction } from '../grpc/model/mempool_pb';
import { Account } from './helper/interfaces';
export declare type MempoolTransactionsResponse = GetMempoolTransactionsResponse.AsObject;
export declare type MempoolTransactionResponse = MempoolTransaction.AsObject;
export interface MempoolListParams {
    address?: Account;
    timestampStart?: string;
    timestampEnd?: string;
    pagination?: {
        limit?: number;
        page?: number;
        orderBy?: 0 | 1;
    };
}
declare function getList(params?: MempoolListParams): Promise<MempoolTransactionsResponse>;
declare function get(id: string): Promise<MempoolTransactionResponse>;
declare const _default: {
    get: typeof get;
    getList: typeof getList;
};
export default _default;
