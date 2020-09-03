import 'mocha';
import zoobc, { NodeListParams } from '../src';
import { GetNodeAddressesInfoRequest } from '../grpc/model/nodeAddressInfo_pb';
import { FakeTransportBuilder } from '@improbable-eng/grpc-web-fake-transport';
import { grpc } from '@improbable-eng/grpc-web';
import { expect } from 'chai';

function mockListNodeAddress() {
  const request = new GetNodeAddressesInfoRequest();
  return new FakeTransportBuilder().withMessages([request]).build();
}

describe('Node Address Unit Testing :', () => {
  before(() => {
    const hosts = [{ host: 'http://85.90.246.90:8002', name: '168 Testnet' }];
    zoobc.Network.list(hosts);
  });
  describe('getInfo', () => {
    it('getInfo should return a list of node address info', async () => {
      const transport = mockListNodeAddress();
      grpc.setDefaultTransport(transport);

      const nodeListParam: NodeListParams = {};
      const listNode = await zoobc.Node.getList(nodeListParam);

      const result = await zoobc.NodeAddress.getInfo(listNode.noderegistrationsList.map(ln => ln.nodeid));
      expect(result).to.be.an('object');
      expect(result.nodeaddressesinfoList).to.be.an('array');
    });
  });
});
