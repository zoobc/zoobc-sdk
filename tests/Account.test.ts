import 'mocha';
import { expect } from 'chai';
import zoobc, { AccountBalancesParams } from '../src';
import { FakeTransportBuilder } from '@improbable-eng/grpc-web-fake-transport';
import { GetAccountBalanceResponse, AccountBalance, GetAccountBalancesResponse } from '../grpc/model/accountBalance_pb';
import { grpc } from '@improbable-eng/grpc-web';

export interface IMockAccountBalancesParams {
  accountAddressList: string[];
}

describe('Account Unit Testing :', () => {
  before(() => {
    const hosts = [{ host: 'http://85.90.246.90:8002', name: '168 Testnet' }];
    zoobc.Network.list(hosts);
  });
  describe('getBalance', () => {
    it('should return object with accountbalance properties', async () => {
      const address = 'BCZD_VxfO2S9aziIL3cn_cXW7uPDVPOrnXuP98GEAUC7';
      const getBalanceResponse = new GetAccountBalanceResponse();
      const accountBalance = new AccountBalance();

      accountBalance.setAccountaddress(address);
      getBalanceResponse.setAccountbalance(accountBalance);

      const transport = new FakeTransportBuilder().withMessages([getBalanceResponse]).build();
      grpc.setDefaultTransport(transport);

      const account = await zoobc.Account.getBalance(address);
      expect(account).to.be.an('object');
      expect(account).to.be.have.property('accountbalance');
    });
  });
  describe('getBalances', () => {
    it('should return object with accountbalanceList properties as an array and accountbalancesize as a number', async () => {
      const getBalancesResponse = new GetAccountBalancesResponse();
      const accountBalances = new Array<AccountBalance>();
      const params: AccountBalancesParams = {
        accountAddressList: ['iSJt3H8wFOzlWKsy_UoEWF_OjF6oymHMqthyUMDKSyxb'],
      };

      getBalancesResponse.setAccountbalancesList(accountBalances);
      getBalancesResponse.setAccountbalancesize(0);
      const transport = new FakeTransportBuilder().withMessages([getBalancesResponse]).build();
      grpc.setDefaultTransport(transport);

      const result = await zoobc.Account.getBalances(params);
      expect(result).to.be.an('object');
      expect(result.accountbalancesList).to.be.an('array');
      expect(result.accountbalancesize).to.be.an('number');
    });
  });
});
