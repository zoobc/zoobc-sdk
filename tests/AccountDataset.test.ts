import 'mocha';
import zoobc from '../src';
import { GetAccountDatasetsRequest, GetAccountDatasetRequest } from '../grpc/model/accountDataset_pb';
import { FakeTransportBuilder } from '@improbable-eng/grpc-web-fake-transport';
import { grpc } from '@improbable-eng/grpc-web';
import { expect } from 'chai';

interface IMockAccountDatasetTransport {
  property: string;
  recipientAccountAddress: string;
}

function mockListAccountDataset(height: number) {
  const request = new GetAccountDatasetsRequest();
  request.setHeight(height);
  return new FakeTransportBuilder().withMessages([request]).build();
}

function mockAccountDataset(params: IMockAccountDatasetTransport) {
  const request = new GetAccountDatasetRequest();
  request.setProperty(params.property);
  request.setRecipientaccountaddress(params.recipientAccountAddress);
  return new FakeTransportBuilder().withMessages([request]).build();
}

describe('Account Dataset Unit Testing :', () => {
  before(() => {
    const hosts = [{ host: 'http://85.90.246.90:8002', name: '168 Testnet' }];
    zoobc.Network.list(hosts);
  });
  describe('getList', () => {
    it('getList should return object with accountdatasetsList properties as an array and total as a string', async () => {
      const height = 0;
      const transport = mockListAccountDataset(height);
      grpc.setDefaultTransport(transport);

      const result = await zoobc.AccountDataset.getList({ height });
      expect(result).to.be.an('object');
      expect(result.accountdatasetsList).to.be.an('array');
      expect(result.total).to.be.an('string');
    });
  });
  describe('get', () => {
    it('get should return object', async () => {
      const params: IMockAccountDatasetTransport = {
        property: 'AccountDatasetEscrowApproval',
        recipientAccountAddress: 'BCZEGOb3WNx3fDOVf9ZS4EjvOIv_UeW4TVBQJ_6tHKlE',
      };
      const transport = mockAccountDataset(params);
      grpc.setDefaultTransport(transport);

      const result = await zoobc.AccountDataset.get(params);
      expect(result).to.be.an('object');
    });
  });
});
