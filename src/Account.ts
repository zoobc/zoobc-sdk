import {
  GetAccountBalanceRequest,
  GetAccountBalanceResponse,
  GetAccountBalancesResponse,
  GetAccountBalancesRequest,
} from '../grpc/model/accountBalance_pb';
import { AccountBalanceServiceClient } from '../grpc/service/accountBalance_pb_service';
import Network from './Network';
import { grpc } from '@improbable-eng/grpc-web';

function getBalance(address: string): Promise<GetAccountBalanceResponse.AsObject> {
  return new Promise((resolve, reject) => {
    const networkIP = Network.selected();
    const request = new GetAccountBalanceRequest();

    request.setAccountaddress(address);
    const client = new AccountBalanceServiceClient(networkIP.host);
    client.getAccountBalance(request, (err, res) => {
      if (err) {
        const { code, message } = err;
        if (code == grpc.Code.NotFound) {
          return resolve({
            accountbalance: {
              spendablebalance: '0',
              balance: '0',
              accountaddress: address,
              blockheight: 0,
              poprevenue: '0',
              latest: true,
            },
          });
        } else if (code != grpc.Code.OK) return reject(message);
      }
      if (res) resolve(res.toObject());
    });
  });
}

function getBalances(addresses: string[]): Promise<GetAccountBalancesResponse.AsObject> {
  return new Promise((resolve, reject) => {
    const networkIP = Network.selected();
    const request = new GetAccountBalancesRequest();
    request.setAccountaddressesList(addresses);
    const client = new AccountBalanceServiceClient(networkIP.host);
    client.getAccountBalances(request, (err, res) => {
      if (err) reject(err);
      if (res) resolve(res.toObject());
    });
  });
}

export default { getBalance, getBalances };
