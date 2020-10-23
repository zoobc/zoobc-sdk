import { PostTransactionResponse } from '../grpc/model/transaction_pb';
import { SetupDatasetInterface } from './helper/transaction-builder/setup-account-dataset';
import { BIP32Interface } from 'bip32';
import { RemoveDatasetInterface } from './helper/transaction-builder/remove-account-dataset';
import { Account } from './helper/interfaces';
import { AccountDataset, AccountDatasets } from './helper/wallet/AccountDataset';
export declare type SetupDatasetResponse = PostTransactionResponse.AsObject;
export declare type RemoveAccountDatasetResponse = PostTransactionResponse.AsObject;
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
export declare function getList(params?: AccountDatasetListParams): Promise<AccountDatasets>;
export declare function get(property: string, recipient: Account): Promise<AccountDataset>;
export declare function setupDataset(data: SetupDatasetInterface, childSeed: BIP32Interface): Promise<SetupDatasetResponse>;
export declare function removeDataset(data: RemoveDatasetInterface, childseed: BIP32Interface): Promise<RemoveAccountDatasetResponse>;
declare const _default: {
    getList: typeof getList;
    get: typeof get;
    setupDataset: typeof setupDataset;
    removeDataset: typeof removeDataset;
};
export default _default;
