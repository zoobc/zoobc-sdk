import { GetAccountBalanceRequest, GetAccountBalanceResponse } from '../grpc/model/accountBalance_pb';
import { AccountBalanceServiceClient } from '../grpc/service/accountBalance_pb_service';
import Network from './Network';

export interface ZBCAccount {
  accountaddress: string;
  blockheight: number;
  spendablebalance: number;
  balance: number;
  poprevenue: number;
  latest: boolean;
}

function getBalance(address: string): Promise<GetAccountBalanceResponse.AsObject> {
  return new Promise((resolve, reject) => {
    const networkIP = Network.selected();
    const request = new GetAccountBalanceRequest();

    request.setAccountaddress(address);
    const client = new AccountBalanceServiceClient(networkIP.host);
    client.getAccountBalance(request, (err, res) => {
      if (err) reject(err);
      if (res) resolve(res.toObject());
    });
  });
}

export default { getBalance };
