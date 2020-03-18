import 'mocha';
import { expect } from 'chai';
import zoobc from '../src';
import { FakeTransportBuilder } from '@improbable-eng/grpc-web-fake-transport';
import { GetMempoolTransactionsResponse, GetMempoolTransactionResponse, MempoolTransaction } from '../grpc/model/mempool_pb';
import { MempoolListParams } from '../src';
import { Pagination } from '../grpc/model/pagination_pb';
import { grpc } from '@improbable-eng/grpc-web';

function mockMempoolTransactionsTransport(params?: MempoolListParams) {
  const mempoolTransactionsResponse = new GetMempoolTransactionsResponse();

  if (params) {
    const { pagination } = params;

    if (pagination) {
      const reqPagination = new Pagination();
      reqPagination.setLimit(pagination.limit || 10);
      reqPagination.setPage(pagination.page || 1);
      mempoolTransactionsResponse.setTotal(reqPagination.getLimit() * reqPagination.getPage());
    }
  }

  return new FakeTransportBuilder().withMessages([mempoolTransactionsResponse]).build();
}

function mockMempoolTransactionTransport(id: string) {
  const mempoolTransactionResponse = new GetMempoolTransactionResponse();
  const mempoolTransaction = new MempoolTransaction();

  if (id) mempoolTransaction.setId(id);

  mempoolTransactionResponse.setTransaction(mempoolTransaction);

  return new FakeTransportBuilder().withMessages([mempoolTransactionResponse]).build();
}

describe('Mempool Transaction Unit Testing :', () => {
  beforeEach(() => {
    const hosts = [{ host: 'http://85.90.246.90:8002', name: '168 Testnet' }];
    zoobc.Network.list(hosts);
  });

  describe('Get Mempool Transaction List', () => {
    it('should return object with mempoolTransactionsList property as an empty array & total property as an number equal to 10', async () => {
      const pagination = {
        page: 1,
        limit: 10,
      };

      grpc.setDefaultTransport(mockMempoolTransactionsTransport({ pagination }));

      const mempoolTransactions = await zoobc.Mempool.getList({ pagination });

      expect(mempoolTransactions).to.be.an('object');
      expect(mempoolTransactions?.total)
        .to.be.an('number')
        .that.is.equal(10);
      expect(mempoolTransactions?.mempooltransactionsList).to.be.an('array').that.is.empty;
    });
  });

  describe('Get Mempool Transaction Detail', () => {
    it('should return an object of mempool transaction detail with ID = 1  ', async () => {
      const id = '1';

      grpc.setDefaultTransport(mockMempoolTransactionTransport(id));

      const mempoolTransaction = await zoobc.Mempool.get(id);

      expect(mempoolTransaction).to.be.an('object');
      expect(mempoolTransaction?.id).to.be.equal(id);
    });
  });
});
