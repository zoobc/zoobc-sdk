import 'mocha';
import { expect } from 'chai';
import zoobc from '../src';
import { FakeTransportBuilder } from '@improbable-eng/grpc-web-fake-transport';
import { GetAccountBalanceResponse, AccountBalance } from '../grpc/model/accountBalance_pb';
import { grpc } from '@improbable-eng/grpc-web';

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
});
