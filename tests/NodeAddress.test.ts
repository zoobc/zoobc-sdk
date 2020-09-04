import 'mocha';
import zoobc from '../src';
import { GetNodeAddressesInfoResponse, NodeAddressInfo } from '../grpc/model/nodeAddressInfo_pb';
import { FakeTransportBuilder } from '@improbable-eng/grpc-web-fake-transport';
import { grpc } from '@improbable-eng/grpc-web';
import { expect } from 'chai';

const hosts = [{ host: 'http://85.90.246.90:8002', name: '168 Testnet' }];
zoobc.Network.list(hosts);

function mockListNodeAddress(param: string[]) {
  const response = new GetNodeAddressesInfoResponse();
  let node = new NodeAddressInfo();
  node.setNodeid(param[0]);
  response.setNodeaddressesinfoList([node]);
  return new FakeTransportBuilder().withMessages([response]).build();
}

describe('Node Address Unit Testing :', () => {
  describe('getInfo', () => {
    it('getInfo should return a list of node address info', async () => {
      const param = ['10'];
      const transport = mockListNodeAddress(param);
      grpc.setDefaultTransport(transport);

      const result = await zoobc.NodeAddress.getInfo(param);
      expect(result).to.be.an('object');
      expect(result.nodeaddressesinfoList).to.be.an('array');
    });
  });
});
