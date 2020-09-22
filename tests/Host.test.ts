import 'mocha';
import zoobc from '../src';
import { FakeTransportBuilder } from '@improbable-eng/grpc-web-fake-transport';
import { grpc } from '@improbable-eng/grpc-web';
import { expect } from 'chai';
import { Empty } from '../grpc/model/empty_pb';

function mockHostInfo() {
  const request = new Empty();
  return new FakeTransportBuilder().withMessages([request]).build();
}

describe('Host Unit Testing :', () => {
  before(() => {
    const hosts = [{ host: 'http://85.90.246.90:8002', name: '168 Testnet' }];
    zoobc.Network.list(hosts);
  });
  describe('getInfo', () => {
    it('getInfo should return object', async () => {
      const transport = mockHostInfo();
      grpc.setDefaultTransport(transport);

      const result = await zoobc.Host.getInfo();
      expect(result).to.be.an('object');
    });
  });
});
