import 'mocha';
import { expect } from 'chai';
import { grpc } from '@improbable-eng/grpc-web';
import { FakeTransportBuilder } from '@improbable-eng/grpc-web-fake-transport';
import { SendMoneyInterface, sendMoneyBuilder } from '../src/helper/transaction-builder/send-money';
import {
  GetTransactionsRequest,
  PostTransactionRequest,
  Transaction,
  GetTransactionMinimumFeeResponse,
} from '../grpc/model/transaction_pb';

import zoobc, { ZooKeyring } from '../src';

const hosts = [{ host: 'http://85.90.246.90:8002', name: '168 Testnet' }];
const passphare =
  'stand cheap entire summer claw subject victory supreme top divide tooth park change excite legend category motor text zebra bottom mystery off garage energy';
const keyring = new ZooKeyring(passphare, 'p4ssphr4se');
const childSeed = keyring.calcDerivationPath(0);

zoobc.Network.list(hosts);

function mockTransactions(height: number) {
  const transactions = new GetTransactionsRequest();
  transactions.setHeight(height);
  return new FakeTransportBuilder().withMessages([transactions]).build();
}

function mockTransaction(id: string) {
  const transaction = new Transaction();
  if (id) transaction.setId(id);
  return new FakeTransportBuilder().withMessages([transaction]).build();
}

function mockSendMoney(data: SendMoneyInterface) {
  const txBytes = sendMoneyBuilder(data, childSeed);
  const transaction = new PostTransactionRequest();
  transaction.setTransactionbytes(txBytes);
  return new FakeTransportBuilder().withMessages([transaction]).build();
}

function mockGetTransactionMinimumFee() {
  const transaction = new GetTransactionMinimumFeeResponse();
  return new FakeTransportBuilder().withMessages([transaction]).build();
}

describe('Transactions Unit Testing :', () => {
  describe('getList', () => {
    it('getList should return object with transactionsList properties as an array', async () => {
      const height = 0;
      const transport = mockTransactions(height);
      grpc.setDefaultTransport(transport);

      const transactions = await zoobc.Transactions.getList({ height });
      expect(transactions).to.be.an('object');
      expect(transactions.transactionsList).to.be.an('array');
    });
  });

  describe('get', () => {
    it('get by id should return transaction object with transaction id -9217566097706424672', async () => {
      const id = '-9217566097706424672';
      const transport = mockTransaction(id);
      grpc.setDefaultTransport(transport);

      const transaction = await zoobc.Transactions.get(id);
      expect(transaction).to.be.an('object');
      expect(transaction.id).to.be.equal(id);
    });
  });

  describe('sendMoney', () => {
    it('sendMoney should return new transaction object', async () => {
      const data = {
        sender: 'BCZD_VxfO2S9aziIL3cn_cXW7uPDVPOrnXuP98GEAUC7',
        recipient: '5yOq6mtspHBApow2dPIoUdEliiNwwGsO_OoNXwAz5msy',
        fee: 0,
        amount: 1,
      };

      const transport = mockSendMoney({ ...data });
      grpc.setDefaultTransport(transport);

      const result = await zoobc.Transactions.sendMoney(data, childSeed);
      expect(result).to.be.an('object');
      expect(result && result.transaction && result.transaction.fee).to.be.equal(data.fee.toString());
    });
  });

  describe('getTransactionMinimumFee', () => {
    it('should return object with property fee', async () => {
      const data = {
        sender: 'BCZD_VxfO2S9aziIL3cn_cXW7uPDVPOrnXuP98GEAUC7',
        recipient: '5yOq6mtspHBApow2dPIoUdEliiNwwGsO_OoNXwAz5msy',
        fee: 0,
        amount: 1,
      };

      const transport = mockGetTransactionMinimumFee();
      grpc.setDefaultTransport(transport);

      const result = await zoobc.Transactions.getTransactionMinimumFee(data, childSeed);
      console.log(result);
      expect(result).to.be.an('object');
      expect(result).to.be.have.property('fee');
    });
  });
});
