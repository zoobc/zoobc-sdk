import { GetAccountDatasetsResponse, AccountDataset } from '../grpc/model/accountDataset_pb';
export interface AccountDatasetListParams {
    property?: string;
    value?: string;
    recipientAccountAddress?: string;
    setterAccountAddress?: string;
    height?: number;
    pagination?: {
        limit?: number;
        page?: number;
        orderBy?: 0 | 1;
    };
}
export interface AccountDatasetParams {
    property: string;
    recipientAccountAddress: string;
}
export declare function getList(params?: AccountDatasetListParams): Promise<GetAccountDatasetsResponse.AsObject>;
export declare function get(params: AccountDatasetParams): Promise<AccountDataset.AsObject>;
declare const _default: {
    getList: typeof getList;
    get: typeof get;
};
export default _default;
