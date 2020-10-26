import { AccountDataset as AccountDatasetResponse, GetAccountDatasetsResponse } from '../../../grpc/model/accountDataset_pb';
import { Account } from '../interfaces';
export interface AccountDataset {
    setter: Account;
    recipient: Account;
    property: string;
    value: string;
    isActive: boolean;
    latest: boolean;
    height: number;
}
export interface AccountDatasets {
    total: number;
    accountDatasets: AccountDataset[];
}
export declare function toZBCDataset(dataset: AccountDatasetResponse.AsObject): AccountDataset;
export declare function toZBCDatasets(datasets: GetAccountDatasetsResponse.AsObject): AccountDatasets;
