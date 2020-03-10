import { GetMempoolTransactionsResponse, MempoolTransaction } from '../grpc/model/mempool_pb';
declare function get(address: string, page: number, limit: number): Promise<GetMempoolTransactionsResponse.AsObject>;
declare function getOne(id: string): Promise<MempoolTransaction.AsObject>;
declare const _default: {
    get: typeof get;
    getOne: typeof getOne;
};
export default _default;
