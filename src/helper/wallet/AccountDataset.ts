import { AccountDataset as AccountDatasetResponse, GetAccountDatasetsResponse } from '../../../grpc/model/accountDataset_pb';
import { Account } from '../interfaces';
import { parseAccountAddress } from '../utils';

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

export function toZBCDataset(dataset: AccountDatasetResponse.AsObject): AccountDataset {
  return {
    setter: parseAccountAddress(dataset.setteraccountaddress),
    recipient: parseAccountAddress(dataset.recipientaccountaddress),
    property: dataset.property,
    value: dataset.value,
    isActive: dataset.isactive,
    latest: dataset.latest,
    height: dataset.height,
  };
}

export function toZBCDatasets(datasets: GetAccountDatasetsResponse.AsObject): AccountDatasets {
  const list = datasets.accountdatasetsList.map(dataset => toZBCDataset(dataset));
  return {
    total: parseInt(datasets.total),
    accountDatasets: list,
  };
}
