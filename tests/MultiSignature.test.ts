import zoobc from '../src';
import { expect } from 'chai';
import { MultiSigAddress, MultisigPendingListParams, MultisigInfoParams } from '../src/MultiSignature';
import {
  GetPendingTransactionsResponse,
  GetPendingTransactionDetailByTransactionHashResponse,
  GetMultisignatureInfoResponse,
} from '../grpc/model/multiSignature_pb';
import { FakeTransportBuilder } from '@improbable-eng/grpc-web-fake-transport';
import { grpc } from '@improbable-eng/grpc-web';

const multisigs: MultiSigAddress[] = [
  {
    participants: ['AFiTqqX99kYXjLFJJ2AWuzKK5zxYUT1Pn0p3s6lutkai', 'iSJt3H8wFOzlWKsy_UoEWF_OjF6oymHMqthyUMDKSyxb'],
    nonce: 1,
    minSigs: 2,
  },
  {
    participants: ['AFiTqqX99kYXjLFJJ2AWuzKK5zxYUT1Pn0p3s6lutkai', 'iSJt3H8wFOzlWKsy_UoEWF_OjF6oymHMqthyUMDKSyxb'],
    nonce: 2,
    minSigs: 2,
  },
];

const base64s: string[] = [
  'AgAAAAEAAAACAAAALAAAAEFGaVRxcVg5OWtZWGpMRkpKMkFXdXpLSzV6eFlVVDFQbjBwM3M2bHV0a2FpLAAAAGlTSnQzSDh3Rk96bFdLc3lfVW9FV0ZfT2pGNm95bUhNcXRoeVVNREtTeXhi',
  'AgAAAAIAAAACAAAALAAAAEFGaVRxcVg5OWtZWGpMRkpKMkFXdXpLSzV6eFlVVDFQbjBwM3M2bHV0a2FpLAAAAGlTSnQzSDh3Rk96bFdLc3lfVW9FV0ZfT2pGNm95bUhNcXRoeVVNREtTeXhi',
];

const hosts = [{ host: 'http://85.90.246.90:8002', name: '168 Testnet' }];
zoobc.Network.list(hosts);

function mockPendingTxTransport() {
  const transactions = new GetPendingTransactionsResponse();
  transactions.setPage(1);
  transactions.setPendingtransactionsList([]);
  return new FakeTransportBuilder().withMessages([transactions]).build();
}

function mockPendingByTxHashTransport() {
  const transactions = new GetPendingTransactionDetailByTransactionHashResponse();
  transactions.setMultisignatureinfo();
  transactions.setPendingsignaturesList([]);
  transactions.setPendingtransaction();
  return new FakeTransportBuilder().withMessages([transactions]).build();
}

function mockMultisigInfoTransport() {
  const multisigInfo = new GetMultisignatureInfoResponse();
  multisigInfo.setMultisignatureinfoList([]);
  multisigInfo.setPage(1);
  return new FakeTransportBuilder().withMessages([multisigInfo]).build();
}

describe('MultiSignature Unit Testing: ', () => {
  describe('Create Multisig Address', () => {
    it('should return a base64 address string', () => {
      multisigs.forEach((multisig, i) => {
        const base64 = zoobc.MultiSignature.generateMultiSigInfo(multisig).toString('base64');

        expect(base64).to.be.equal(base64s[i]);
      });
    });
  });

  describe('Get Pending Multisig Transactions', () => {
    it('should return pendingtransactionsList object', async () => {
      const params: MultisigPendingListParams = {
        pagination: {
          page: 1,
        },
      };
      const transport = mockPendingTxTransport();
      grpc.setDefaultTransport(transport);

      const transactions = await zoobc.MultiSignature.getPendingList(params);

      expect(transactions).to.be.an('object');
      expect(transactions.pendingtransactionsList).to.be.an('array');
      expect(transactions.page).to.be.an('number');
    });
  });

  describe('Get Pending Multisig Transactions By TxHash', () => {
    it('should return pendingtransactionsList object', async () => {
      const transport = mockPendingByTxHashTransport();
      grpc.setDefaultTransport(transport);

      const transactions = await zoobc.MultiSignature.getPendingByTxHash('asjdkahsdkajs');

      expect(transactions).to.be.an('object');
      expect(transactions.pendingsignaturesList).to.be.an('array');
      expect(transactions).to.have.property('pendingtransaction');
      expect(transactions).to.have.property('multisignatureinfo');
    });
  });

  describe('Get Multisig Info List', () => {
    it('should return pendingtransactionsList object', async () => {
      const transport = mockMultisigInfoTransport();
      grpc.setDefaultTransport(transport);

      const params: MultisigInfoParams = {
        address: 'iSJt3H8wFOzlWKsy_UoEWF_OjF6oymHMqthyUMDKSyxb',
        pagination: {
          page: 1,
        },
      };

      const multisigInfo = await zoobc.MultiSignature.getMultisigInfo(params);

      expect(multisigInfo).to.be.an('object');
      expect(multisigInfo.page).to.be.an('number');
      expect(multisigInfo.multisignatureinfoList).to.be.an('array');
    });
  });
});
