import { GetMempoolTransactionsResponse, MempoolTransaction } from '../grpc/model/mempool_pb';
export interface MempoolListParams {
    address?: string;
    timestampStart?: string;
    timestampEnd?: string;
    pagination?: {
        limit?: number;
        page?: number;
        orderBy?: 0 | 1;
    };
}
declare function getList(params?: MempoolListParams): Promise<GetMempoolTransactionsResponse.AsObject>;
declare function get(id: string): Promise<MempoolTransaction.AsObject>;
declare const _default: {
    get: typeof get;
    getList: typeof getList;
};
export default _default;
