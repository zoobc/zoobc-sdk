import { GetAccountDatasetsResponse, AccountDataset } from '../grpc/model/accountDataset_pb';
import { PostTransactionResponse } from '../grpc/model/transaction_pb';
import { SetupDatasetInterface } from './helper/transaction-builder/setup-account-dataset';
import { BIP32Interface } from 'bip32';
import { RemoveDatasetInterface } from './helper/transaction-builder/remove-account-dataset';
export declare type AccountDatasetsResponse = GetAccountDatasetsResponse.AsObject;
export declare type AccountDatasetResponse = AccountDataset.AsObject;
export declare type SetupDatasetResponse = PostTransactionResponse.AsObject;
export declare type RemoveAccountDatasetResponse = PostTransactionResponse.AsObject;
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
export declare function getList(params?: AccountDatasetListParams): Promise<AccountDatasetsResponse>;
export declare function get(params: AccountDatasetParams): Promise<AccountDatasetResponse>;
export declare function setupDataset(data: SetupDatasetInterface, childSeed: BIP32Interface): Promise<SetupDatasetResponse>;
export declare function removeDataset(data: RemoveDatasetInterface, childseed: BIP32Interface): Promise<RemoveAccountDatasetResponse>;
declare const _default: {
    getList: typeof getList;
    get: typeof get;
    setupDataset: typeof setupDataset;
    removeDataset: typeof removeDataset;
};
export default _default;
