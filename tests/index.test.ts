import 'mocha';
import { expect } from 'chai';
import { NodeHttpTransport } from '@improbable-eng/grpc-web-node-http-transport';
import zoobc from '../src/index';

const host = 'http://18.139.3.139:7001';
const conn = zoobc.connection(host);
zoobc.httpTransport(NodeHttpTransport());

describe('Zoobc unit testing :', () => {
  it(`checking connection ${host} return void`, async () => {
    await expect(conn).to.be.an('undefined');
  });

  describe('Blocks unit testing :', async () => {
    describe('get list block', () => {
      const p = { chaintype: 0, limit: 2, height: 1 };

      it('checking blocks should return object', async () => {
        const res = await zoobc.getBlocks(p.chaintype, p.limit, p.height);
        await expect(res).to.be.an('object');
      });

      it('checking blocks should have property chaintype', async () => {
        const res = await zoobc.getBlocks(p.chaintype, p.limit, p.height);
        await expect(res).to.be.have.haveOwnProperty('chaintype');
        await expect(res.chaintype).to.equal(p.chaintype);
      });

      it('checking blocks should have property count', async () => {
        const res = await zoobc.getBlocks(p.chaintype, p.limit, p.height);
        await expect(res).to.be.have.haveOwnProperty('count');
        await expect(res.count).to.equal(p.limit);
      });

      it('checking blocks should have property height', async () => {
        const res = await zoobc.getBlocks(p.chaintype, p.limit, p.height);
        await expect(res).to.be.have.haveOwnProperty('height');
        await expect(res.height).to.equal(p.height);
      });

      it('checking blocksList should return array', async () => {
        const res = await zoobc.getBlocks(p.chaintype, p.limit, p.height);
        await expect(res.blocksList).to.be.an('array');
      });
    });

    describe('get single block', () => {
      it('should return error if id = 0 and height = 0', async () => {
        const id = '0';
        const height = 0;
        try {
          await zoobc.getBlock(0, id, height);
        } catch (error) {
          expect(error).to.match(
            /Error Block: grpc: error while marshaling: proto: Marshal called with nil/,
          );
          return;
        }
      });

      it('should return object with correct height value', async () => {
        const height = 1;
        const res = await zoobc.getBlock(0, '0', height);
        await expect(res).to.be.an('object');
        await expect(res.height).to.equal(height);
      });

      it('should return object with correct id value', async () => {
        const id = '-9222908138091099853';
        const res = await zoobc.getBlock(0, id, 0);
        await expect(res).to.be.an('object');
        await expect(res.id).to.equal(id);
      });

      it('checking response.transactionsList should return array', async () => {
        const res = await zoobc.getBlock(0, '0', 1);
        await expect(res.transactionsList).to.be.an('array');
      });
    });
  });

  describe('Transactions unit testing :', () => {
    describe('get list transaction', () => {
      it('checking Transactions should return object', async () => {
        const res = await zoobc.getTransactions(5, 1);
        await expect(res).to.be.an('object');
      });

      it('checking transactionsList should return array', async () => {
        const res = await zoobc.getTransactions(5, 1);
        await expect(res.transactionsList).to.be.an('array');
      });

      it('checking transaction should have property total', async () => {
        const res = await zoobc.getTransactions(2, 1);
        await expect(res).to.be.have.haveOwnProperty('total');
      });

      it('checking transaction should have property count & correct value', async () => {
        const res = await zoobc.getTransactions(2, 1);
        await expect(res).to.be.have.haveOwnProperty('count');
        await expect(res.count).to.equal(2);
      });
    });

    describe('get single transaction', () => {
      it('should return object with correct id value', async () => {
        const id = '-4859458532809832450';
        const res = await zoobc.getTransaction(id);
        await expect(res).to.be.an('object');
        await expect(res.id).to.equal(id);
      });
    });
  });
});
