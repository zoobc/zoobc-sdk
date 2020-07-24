import 'mocha';
import zoobc from '../src';
import { GetAccountLedgersRequest } from '../grpc/model/accountLedger_pb';
import { FakeTransportBuilder } from '@improbable-eng/grpc-web-fake-transport';
import { grpc } from '@improbable-eng/grpc-web';
import { expect } from 'chai';

function mockListAccountLedger() {
  const request = new GetAccountLedgersRequest();
  return new FakeTransportBuilder().withMessages([request]).build();
}

describe('Account Ledger Unit Testing :', () => {
  before(() => {
    const hosts = [{ host: 'http://85.90.246.90:8002', name: '168 Testnet' }];
    zoobc.Network.list(hosts);
  });
  describe('getList', () => {
    it('getList should return object with accountledgerlist properties as an array and total as a string', async () => {
      const transport = mockListAccountLedger();
      grpc.setDefaultTransport(transport);
      const result = await zoobc.AccountLedger.getList();
      expect(result).to.be.an('object');
      expect(result.accountledgersList).to.be.an('array');
      expect(result.total).to.be.an('string');
    });
  });
});
