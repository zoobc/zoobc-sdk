// Licensed to the Quasisoft Limited - Hong Kong under one or more agreements
// The Quasisoft Limited - Hong Kong licenses this file to you under MIT license.

import { GetAccountBalanceRequest, GetAccountBalancesRequest, GetAccountBalancesResponse } from '../grpc/model/accountBalance_pb';
import { AccountBalanceServiceClient } from '../grpc/service/accountBalance_pb_service';
import Network from './Network';
import { grpc } from '@improbable-eng/grpc-web';
import { addressToBytes, parseAddress } from './helper/utils';
import { Address } from './helper/interfaces';

export interface AccountBalance {
  address: Address;
  blockHeight: number;
  spendableBalance: number;
  balance: number;
  popRevenue: string;
  latest: boolean;
}

function getBalance(address: Address): Promise<AccountBalance> {
  return new Promise((resolve, reject) => {
    // const networkIP = Network.selected();
    const request = new GetAccountBalanceRequest();

    const addressBytes = addressToBytes(address);
    request.setAccountaddress(addressBytes);

    return Network.request(AccountBalanceServiceClient, 'getAccountBalance', request)
      .catch(err => {
        const { code, message, metadata } = err;
        if (code == grpc.Code.NotFound) {
          return resolve({
            spendableBalance: 0,
            balance: 0,
            address,
            blockHeight: 0,
            popRevenue: '0',
            latest: true,
          });
        } else if (code != grpc.Code.OK) {
          return reject({ code, message, metadata });
        }
      })
      .then(res => {
        const account = res && res.toObject().accountbalance;
        if (account) {
          const parsedAddress = parseAddress(account.accountaddress);
          resolve({
            spendableBalance: parseInt(account.spendablebalance),
            balance: parseInt(account.balance),
            address: parsedAddress,
            blockHeight: account.blockheight,
            popRevenue: account.poprevenue,
            latest: account.latest,
          });
        }
      });

    /*const client = new AccountBalanceServiceClient(networkIP.host);
    client.getAccountBalance(request, (err, res) => {
      if (err) {
        const { code, message, metadata } = err;
        if (code == grpc.Code.NotFound) {
          return resolve({
            spendableBalance: 0,
            balance: 0,
            address,
            blockHeight: 0,
            popRevenue: '0',
            latest: true,
          });
        } else if (code != grpc.Code.OK) return reject({ code, message, metadata });
      }

      const account = res && res.toObject().accountbalance;
      if (account) {
        const parsedAddress = parseAddress(account.accountaddress);
        resolve({
          spendableBalance: parseInt(account.spendablebalance),
          balance: parseInt(account.balance),
          address: parsedAddress,
          blockHeight: account.blockheight,
          popRevenue: account.poprevenue,
          latest: account.latest,
        });
      }
    });*/
  });
}

function getBalances(addresses: Address[]): Promise<AccountBalance[]> {
  return new Promise((resolve, reject) => {
    const addressesBytes: Buffer[] = addresses.map(address => addressToBytes(address));
    // const networkIP = Network.selected();
    const request = new GetAccountBalancesRequest();
    request.setAccountaddressesList(addressesBytes);

    Network.request(AccountBalanceServiceClient, 'getAccountBalances', request)
      .catch(err => {
        const { code, message, metadata } = err;
        reject({ code, message, metadata });
      })
      .then((res: GetAccountBalancesResponse) => {
        const accounts = (res && res.toObject().accountbalancesList) || [];
        const zbcAccounts = addresses.map((address, i) => {
          const account = accounts.find(acc => parseAddress(acc.accountaddress).value == address.value);
          if (account) {
            return {
              spendableBalance: parseInt(account.spendablebalance),
              balance: parseInt(account.balance),
              address,
              blockHeight: account.blockheight,
              popRevenue: account.poprevenue,
              latest: account.latest,
            };
          } else
            return {
              spendableBalance: 0,
              balance: 0,
              address,
              blockHeight: 0,
              popRevenue: '0',
              latest: true,
            };
        });
        resolve(zbcAccounts);
      });

    /*const client = new AccountBalanceServiceClient(networkIP.host);
    client.getAccountBalances(request, (err, res) => {
      if (err) {
        const { code, message, metadata } = err;
        reject({ code, message, metadata });
      }

      const accounts = (res && res.toObject().accountbalancesList) || [];
      const zbcAccounts = addresses.map((address, i) => {
        const account = accounts.find(acc => parseAddress(acc.accountaddress).value == address.value);
        if (account) {
          return {
            spendableBalance: parseInt(account.spendablebalance),
            balance: parseInt(account.balance),
            address,
            blockHeight: account.blockheight,
            popRevenue: account.poprevenue,
            latest: account.latest,
          };
        } else
          return {
            spendableBalance: 0,
            balance: 0,
            address,
            blockHeight: 0,
            popRevenue: '0',
            latest: true,
          };
      });
      resolve(zbcAccounts);
    });*/
  });
}

export default { getBalance, getBalances };
