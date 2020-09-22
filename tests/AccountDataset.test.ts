import 'mocha';
import zoobc, { ZooKeyring } from '../src';
import { GetAccountDatasetsRequest, GetAccountDatasetRequest } from '../grpc/model/accountDataset_pb';
import { FakeTransportBuilder } from '@improbable-eng/grpc-web-fake-transport';
import { grpc } from '@improbable-eng/grpc-web';
import { expect } from 'chai';
import { SetupDatasetInterface, setupDatasetBuilder } from '../src/helper/transaction-builder/setup-account-dataset';
import { PostTransactionResponse, Transaction } from '../grpc/model/transaction_pb';
import { RemoveDatasetInterface, removeDatasetBuilder } from '../src/helper/transaction-builder/remove-account-dataset';

interface IMockAccountDatasetTransport {
  property: string;
  recipientAccountAddress: string;
}

const passphare =
  'stand cheap entire summer claw subject victory supreme top divide tooth park change excite legend category motor text zebra bottom mystery off garage energy';
const keyring = new ZooKeyring(passphare, 'p4ssphr4se');
const childSeed = keyring.calcDerivationPath(0);

function mockListAccountDataset(height: number) {
  const request = new GetAccountDatasetsRequest();
  request.setHeight(height);
  return new FakeTransportBuilder().withMessages([request]).build();
}

function mockAccountDataset(property: string, recipientAccountAddress: string) {
  const request = new GetAccountDatasetRequest();
  request.setProperty(property);
  request.setRecipientaccountaddress(recipientAccountAddress);
  return new FakeTransportBuilder().withMessages([request]).build();
}

function mockSetupDataset(data: SetupDatasetInterface) {
  const bytes = setupDatasetBuilder(data, childSeed);

  const response = new PostTransactionResponse();
  const transaction = new Transaction();

  transaction.setTransactionbodybytes(bytes);
  response.setTransaction(transaction);

  return new FakeTransportBuilder().withMessages([response]).build();
}

function mockRemoveDataset(data: RemoveDatasetInterface) {
  const bytes = removeDatasetBuilder(data, childSeed);

  const response = new PostTransactionResponse();
  const transaction = new Transaction();

  transaction.setTransactionbodybytes(bytes);
  response.setTransaction(transaction);

  return new FakeTransportBuilder().withMessages([response]).build();
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
      const property = 'AccountDatasetEscrowApproval';
      const recipientAccountAddress = 'BCZEGOb3WNx3fDOVf9ZS4EjvOIv_UeW4TVBQJ_6tHKlE';

      const transport = mockAccountDataset(property, recipientAccountAddress);
      grpc.setDefaultTransport(transport);

      const result = await zoobc.AccountDataset.get(property, recipientAccountAddress);
      expect(result).to.be.an('object');
    });
  });
  describe('Setup Account Dataset', () => {
    it('should return new transaction object', async () => {
      const data: SetupDatasetInterface = {
        setterAccountAddress: 'iSJt3H8wFOzlWKsy_UoEWF_OjF6oymHMqthyUMDKSyxb',
        property: 'Admin',
        value: 'Welcome',
        fee: 1,
        recipientAccountAddress: 'AFiTqqX99kYXjLFJJ2AWuzKK5zxYUT1Pn0p3s6lutkai',
      };

      const transport = mockSetupDataset({ ...data });
      grpc.setDefaultTransport(transport);

      const result = await zoobc.AccountDataset.setupDataset(data, childSeed);
      expect(result).to.be.an('object');
    });
  });
  describe('Remove Account Dataset', () => {
    it('should return new transaction object', async () => {
      const data: RemoveDatasetInterface = {
        setterAccountAddress: 'iSJt3H8wFOzlWKsy_UoEWF_OjF6oymHMqthyUMDKSyxb',
        property: 'Admin',
        value: 'Welcome',
        fee: 1,
        recipientAccountAddress: 'AFiTqqX99kYXjLFJJ2AWuzKK5zxYUT1Pn0p3s6lutkai',
      };

      const transport = mockRemoveDataset({ ...data });
      grpc.setDefaultTransport(transport);

      const result = await zoobc.AccountDataset.removeDataset(data, childSeed);
      expect(result).to.be.an('object');
    });
  });
});
