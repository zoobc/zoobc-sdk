import { GetAccountBalanceRequest, GetAccountBalancesRequest } from '../grpc/model/accountBalance_pb';
import { AccountBalanceServiceClient } from '../grpc/service/accountBalance_pb_service';
import Network from './Network';
import { grpc } from '@improbable-eng/grpc-web';
import { parseAccountAddress, ZBCAddressToBytes } from './helper/utils';
import { ZBC_ACCOUNT } from './helper/transaction-builder/constant';

export interface ZBCAccount {
  accountAddress: string;
  accountType: Buffer;
  blockHeight: number;
  spendableBalance: number;
  balance: number;
  popRevenue: string;
  latest: boolean;
}

function getBalance(address: string, accountType: Buffer = ZBC_ACCOUNT): Promise<ZBCAccount> {
  return new Promise((resolve, reject) => {
    const networkIP = Network.selected();
    const request = new GetAccountBalanceRequest();

    const addressBytes = ZBCAddressToBytes(address);
    request.setAccountaddress(Buffer.from([...accountType, ...addressBytes]));
    const client = new AccountBalanceServiceClient(networkIP.host);
    client.getAccountBalance(request, (err, res) => {
      if (err) {
        const { code, message, metadata } = err;
        if (code == grpc.Code.NotFound) {
          return resolve({
            spendableBalance: 0,
            balance: 0,
            accountAddress: address,
            accountType: accountType,
            blockHeight: 0,
            popRevenue: '0',
            latest: true,
          });
        } else if (code != grpc.Code.OK) return reject({ code, message, metadata });
      }

      const account = res && res.toObject().accountbalance;
      if (account) {
        const addressBytes = Buffer.from(account.accountaddress.toString(), 'base64');
        const parsedAddress = parseAccountAddress(addressBytes);
        resolve({
          spendableBalance: parseInt(account.spendablebalance),
          balance: parseInt(account.balance),
          accountAddress: parsedAddress.address,
          accountType: parsedAddress.type,
          blockHeight: account.blockheight,
          popRevenue: account.poprevenue,
          latest: account.latest,
        });
      }
    });
  });
}

function getBalances(accounts: { address: string; type: Buffer }[]): Promise<ZBCAccount[]> {
  return new Promise((resolve, reject) => {
    const networkIP = Network.selected();
    const request = new GetAccountBalancesRequest();

    const addressesBytes: Buffer[] = accounts.map(account => {
      const bytes = ZBCAddressToBytes(account.address);
      return Buffer.from([...account.type, ...bytes]);
    });

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
          const addressBytes = Buffer.from(account.accountaddress.toString(), 'base64');
          const parsedAddress = parseAccountAddress(addressBytes);
          return {
            spendableBalance: parseInt(account.spendablebalance),
            balance: parseInt(account.balance),
            accountAddress: parsedAddress.address,
            accountType: parsedAddress.type,
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
