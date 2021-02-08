// Licensed to the Quasisoft Limited - Hong Kong under one or more agreements
// The Quasisoft Limited - Hong Kong licenses this file to you under MIT license.

import { AccountDataset as AccountDatasetResponse, GetAccountDatasetsResponse } from '../../../grpc/model/accountDataset_pb';
import { Address } from '../interfaces';
import { parseAddress } from '../utils';

export interface AccountDataset {
  setter: Address;
  recipient: Address;
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
    setter: parseAddress(dataset.setteraccountaddress),
    recipient: parseAddress(dataset.recipientaccountaddress),
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
