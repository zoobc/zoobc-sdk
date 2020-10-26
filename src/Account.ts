import { GetAccountBalanceRequest, GetAccountBalancesRequest } from '../grpc/model/accountBalance_pb';
import { AccountBalanceServiceClient } from '../grpc/service/accountBalance_pb_service';
import Network from './Network';
import { grpc } from '@improbable-eng/grpc-web';
import { accountToBytes, parseAccountAddress } from './helper/utils';
import { Account } from './helper/interfaces';

export interface AccountBalance {
  account: Account;
  blockHeight: number;
  spendableBalance: number;
  balance: number;
  popRevenue: string;
  latest: boolean;
}

function getBalance(account: Account): Promise<AccountBalance> {
  return new Promise((resolve, reject) => {
    const networkIP = Network.selected();
    const request = new GetAccountBalanceRequest();

    const { type, address } = account;
    const addressBytes = accountToBytes(account);
    request.setAccountaddress(addressBytes);
    const client = new AccountBalanceServiceClient(networkIP.host);
    client.getAccountBalance(request, (err, res) => {
      if (err) {
        const { code, message, metadata } = err;
        if (code == grpc.Code.NotFound) {
          return resolve({
            spendableBalance: 0,
            balance: 0,
            account: { address, type },
            blockHeight: 0,
            popRevenue: '0',
            latest: true,
          });
        } else if (code != grpc.Code.OK) return reject({ code, message, metadata });
      }

      const account = res && res.toObject().accountbalance;
      if (account) {
        const parsedAddress = parseAccountAddress(account.accountaddress);
        resolve({
          spendableBalance: parseInt(account.spendablebalance),
          balance: parseInt(account.balance),
          account: {
            address: parsedAddress.address,
            type: parsedAddress.type,
          },
          blockHeight: account.blockheight,
          popRevenue: account.poprevenue,
          latest: account.latest,
        });
      }
    });
  });
}

function getBalances(accounts: Account[]): Promise<AccountBalance[]> {
  return new Promise((resolve, reject) => {
    const addressesBytes: Buffer[] = accounts.map(account => accountToBytes(account));
    const networkIP = Network.selected();
    const request = new GetAccountBalancesRequest();

    request.setAccountaddressesList(addressesBytes);
    const client = new AccountBalanceServiceClient(networkIP.host);
    client.getAccountBalances(request, (err, res) => {
      if (err) {
        const { code, message, metadata } = err;
        reject({ code, message, metadata });
      }

      const accounts = res && res.toObject().accountbalancesList;
      if (accounts) {
        const zbcAccounts = accounts.map(account => {
          const parsedAddress = parseAccountAddress(account.accountaddress);
          return {
            spendableBalance: parseInt(account.spendablebalance),
            balance: parseInt(account.balance),
            account: {
              address: parsedAddress.address,
              type: parsedAddress.type,
            },
            blockHeight: account.blockheight,
            popRevenue: account.poprevenue,
            latest: account.latest,
          };
        });
        resolve(zbcAccounts);
      }
    });
  });
}

export default { getBalance, getBalances };
