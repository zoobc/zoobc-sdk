import 'mocha';
import { expect } from 'chai';
import { grpc } from '@improbable-eng/grpc-web';
import { FakeTransportBuilder } from '@improbable-eng/grpc-web-fake-transport';
import {
  GetNodeRegistrationResponse,
  GetNodeRegistrationsResponse,
  NodeRegistration,
  GetPendingNodeRegistrationsResponse,
  GetMyNodePublicKeyResponse,
} from '../grpc/model/nodeRegistration_pb';
import { Pagination } from '../grpc/model/pagination_pb';
import { PostTransactionResponse, Transaction } from '../grpc/model/transaction_pb';
import { NodeKey } from '../grpc/model/node_pb';
import { NodeHardware, CPUInformation } from '../grpc/model/nodeHardware_pb';
import { RegisterNodeInterface, registerNodeBuilder } from '../src//helper/transaction-builder/register-node';
import { UpdateNodeInterface, updateNodeBuilder } from '../src/helper/transaction-builder/update-node';
import { RemoveNodeInterface, removeNodeBuilder } from '../src/helper/transaction-builder/remove-node';
import { ClaimNodeInterface, claimNodeBuilder } from '../src/helper/transaction-builder/claim-node';
import zoobc, { NodeListParams, NodeParams, ZooKeyring } from '../src';
import { Empty } from '../grpc/model/empty_pb';
import Network from '../src/Network';

const hosts = [{ host: 'http://85.90.246.90:8002', name: '168 Testnet' }];
zoobc.Network.list(hosts);

const passphare =
  'stand cheap entire summer claw subject victory supreme top divide tooth park change excite legend category motor text zebra bottom mystery off garage energy';
const keyring = new ZooKeyring(passphare, 'p4ssphr4se');
const childSeed = keyring.calcDerivationPath(0);

function mockGetList(params?: NodeListParams) {
  const response = new GetNodeRegistrationsResponse();

  if (params) {
    const { pagination } = params;

    if (pagination) {
      const reqPagination = new Pagination();
      reqPagination.setLimit(pagination.limit || 10);
      reqPagination.setPage(pagination.page || 1);
      response.setTotal((reqPagination.getLimit() * reqPagination.getPage()).toString());
    }
  }

  return new FakeTransportBuilder().withMessages([response]).build();
}

function mockGet(params: NodeParams) {
  const response = new GetNodeRegistrationResponse();
  const nodeRegistration = new NodeRegistration();

  if (params) {
    const { height, owner, publicKey } = params;

    if (owner) nodeRegistration.setAccountaddress(owner);
    if (publicKey) nodeRegistration.setNodepublickey(publicKey);
    if (height) nodeRegistration.setRegistrationheight(height);
  }

  response.setNoderegistration(nodeRegistration);

  return new FakeTransportBuilder().withMessages([response]).build();
}

function mockRegister(data: RegisterNodeInterface) {
  const bytes = registerNodeBuilder(data, Buffer.alloc(8), childSeed);

  const response = new PostTransactionResponse();
  const transaction = new Transaction();

  transaction.setTransactionbodybytes(bytes);
  response.setTransaction(transaction);

  return new FakeTransportBuilder().withMessages([response]).build();
}

function mockUpdate(data: UpdateNodeInterface) {
  const bytes = updateNodeBuilder(data, Buffer.alloc(8), childSeed);

  const response = new PostTransactionResponse();
  const transaction = new Transaction();

  transaction.setTransactionbodybytes(bytes);
  response.setTransaction(transaction);

  return new FakeTransportBuilder().withMessages([response]).build();
}

function mockRemove(data: RemoveNodeInterface) {
  const bytes = removeNodeBuilder(data, childSeed);

  const response = new PostTransactionResponse();
  const transaction = new Transaction();

  transaction.setTransactionbodybytes(bytes);
  response.setTransaction(transaction);

  return new FakeTransportBuilder().withMessages([response]).build();
}

function mockClaim(data: ClaimNodeInterface) {
  const bytes = claimNodeBuilder(data, Buffer.alloc(8), childSeed);

  const response = new PostTransactionResponse();
  const transaction = new Transaction();

  transaction.setTransactionbodybytes(bytes);
  response.setTransaction(transaction);

  return new FakeTransportBuilder().withMessages([response]).build();
}

function mockGenerateNodeKey() {
  const nodePublicKey = new NodeKey();

  nodePublicKey.setPublickey('5E04hoe4JIYpnvSTMMvFr8+GGO7F7AQ/sSRPySagUxM=');

  return new FakeTransportBuilder().withMessages([nodePublicKey]).build();
}

function mockGetHardwareInfo() {
  const nodeHardware = new NodeHardware();

  nodeHardware.setCpuinformationList([new CPUInformation()]);

  return new FakeTransportBuilder().withMessages([nodeHardware]).build();
}

function mockGetNodePendingRegistration() {
  const response = new GetPendingNodeRegistrationsResponse();
  return new FakeTransportBuilder().withMessages([response]).build();
}

function mockGetMyNodePublicKey() {
  const response = new GetMyNodePublicKeyResponse();
  return new FakeTransportBuilder().withMessages([response]).build();
}

describe('Node Unit Testing :', () => {
  describe('getList', () => {
    it('should return object with noderegistrationsList property as an empty array & total property as an number equal to 10', async () => {
      const pagination = {
        page: 1,
        limit: 10,
      };

      grpc.setDefaultTransport(mockGetList({ pagination }));

      const response = await zoobc.Node.getList({ pagination });

      expect(response).to.be.an('object');
      expect(response?.total)
        .to.be.an('string')
        .that.is.equal('10');
      expect(response?.noderegistrationsList).to.be.an('array').that.is.empty;
    });
  });

  describe('get', () => {
    it('should return an object of noderegistration with owner: zfMr7NYWL5xfZKEtxck1nISatFTVhUk3fCigN39MecoH, publicKey: 5E04hoe4JIYpnvSTMMvFr8+GGO7F7AQ/sSRPySagUxM=,height: 0', async () => {
      const params = {
        owner: 'zfMr7NYWL5xfZKEtxck1nISatFTVhUk3fCigN39MecoH',
        publicKey: '5E04hoe4JIYpnvSTMMvFr8+GGO7F7AQ/sSRPySagUxM=',
        height: 0,
      };

      grpc.setDefaultTransport(mockGet(params));

      const response = await zoobc.Node.get(params);

      expect(response?.noderegistration).to.be.an('object');
      expect(response?.noderegistration?.nodepublickey).to.be.equal(params.publicKey);
      expect(response?.noderegistration?.accountaddress).to.be.equal(params.owner);
      expect(response?.noderegistration?.registrationheight).to.be.equal(params.height);
    });
  });

  describe('register', () => {
    it('register should return new transaction object', async () => {
      const data: RegisterNodeInterface = {
        accountAddress: 'zfMr7NYWL5xfZKEtxck1nISatFTVhUk3fCigN39MecoH',
        fee: 0,
        nodePublicKey: Buffer.from([]),
        nodeAddress: '',
        funds: 0,
      };

      const transport = mockRegister({ ...data });
      grpc.setDefaultTransport(transport);

      const result = await zoobc.Node.register(data, childSeed);
      expect(result).to.be.an('object');
      expect(result && result.transaction && result.transaction.fee).to.be.equal(data.fee.toString());
    });
  });

  describe('update', () => {
    it('update should return new transaction object', async () => {
      const data: UpdateNodeInterface = {
        accountAddress: 'zfMr7NYWL5xfZKEtxck1nISatFTVhUk3fCigN39MecoH',
        fee: 0,
        nodePublicKey: Buffer.from([]),
        nodeAddress: '',
        funds: 0,
      };

      const transport = mockUpdate({ ...data });
      grpc.setDefaultTransport(transport);

      const result = await zoobc.Node.update(data, childSeed);
      expect(result).to.be.an('object');
      expect(result && result.transaction && result.transaction.fee).to.be.equal(data.fee.toString());
    });
  });

  describe('remove', () => {
    it('remove should return new transaction object', async () => {
      const data: RemoveNodeInterface = {
        accountAddress: 'zfMr7NYWL5xfZKEtxck1nISatFTVhUk3fCigN39MecoH',
        fee: 0,
        nodePublicKey: Buffer.from([]),
      };

      const transport = mockRemove({ ...data });
      grpc.setDefaultTransport(transport);

      const result = await zoobc.Node.remove(data, childSeed);
      expect(result).to.be.an('object');
      expect(result && result.transaction && result.transaction.fee).to.be.equal(data.fee.toString());
    });
  });

  describe('claim', () => {
    it('claim should return new transaction object', async () => {
      const data: ClaimNodeInterface = {
        accountAddress: 'zfMr7NYWL5xfZKEtxck1nISatFTVhUk3fCigN39MecoH',
        fee: 0,
        nodePublicKey: Buffer.from([]),
        nodeAddress: '',
      };

      const transport = mockClaim({ ...data });
      grpc.setDefaultTransport(transport);

      const result = await zoobc.Node.claim(data, childSeed);
      expect(result).to.be.an('object');
      expect(result && result.transaction && result.transaction.fee).to.be.equal(data.fee.toString());
    });
  });

  describe('generateNodeKey', () => {
    it('generateNodeKey should return a new nodepublickey', async () => {
      const transport = mockGenerateNodeKey();
      grpc.setDefaultTransport(transport);

      const result = await zoobc.Node.generateNodeKey('0.0.0.0:3000', childSeed);

      expect(result).to.be.an('object');
      expect(result.nodepublickey).to.be.an('string');
    });
  });

  describe('getHardwareInfo', () => {
    it('getHardwareInfo should stream nodeharware object', async () => {
      grpc.setDefaultTransport(mockGetHardwareInfo());

      let receivedNodeHardware: NodeHardware.AsObject | undefined;

      zoobc.Node.getHardwareInfo('0.0.0.0:3000', childSeed).subscribe(
        data => (receivedNodeHardware = data.nodehardware),
        () => {
          expect(receivedNodeHardware).to.be.an('object');
        },
      );
    });
  });

  describe('getPendingNodeRegistration', () => {
    it('getPendingNodeRegistration should stream pending node registration array', async () => {
      grpc.setDefaultTransport(mockGetNodePendingRegistration());

      let receivedPendingNodeRegistration: NodeRegistration.AsObject[] | undefined;
      const limit = 1;

      zoobc.Node.getPending(limit, childSeed).subscribe(
        data => (receivedPendingNodeRegistration = data.noderegistrationsList),
        () => {
          expect(receivedPendingNodeRegistration).to.be.an('array');
        },
      );
    });
  });

  describe('getMyNodePublicKey', () => {
    it('getMyNodePublicKey should return object of nodepublickey', async () => {
      const transport = mockGetMyNodePublicKey();
      grpc.setDefaultTransport(transport);
      const networkIP = Network.selected();

      const result = await zoobc.Node.getMyNodePublicKey(networkIP.host);
      expect(result).to.be.an('object');
    });
  });
});
