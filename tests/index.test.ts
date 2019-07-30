import 'mocha';
import { expect } from 'chai';
import zoobc from '../src/index';

const host = 'http://18.139.3.139:7001';
const conn = zoobc.connection(host);

describe('Zoobc unit testing :', () => {
  it(`checking connection ${host} retun void`, async () => {
    expect(conn).to.be.an('undefined');
  });

  describe('Blocks unit testing :', async () => {
    const p = { chaintype: 0, limit: 2, height: 1 };

    it('checking blocks should return object', async () => {
      const getBlocks = await zoobc.getBlocks(p.chaintype, p.limit, p.height);
      expect(getBlocks).to.be.an('object');
    });

    it('checking blocks should have property chaintype', async () => {
      const getBlocks = await zoobc.getBlocks(p.chaintype, p.limit, p.height);
      expect(getBlocks).to.be.have.haveOwnProperty('chaintype');
      expect(getBlocks.chaintype).to.equal(p.chaintype);
    });

    it('checking blocks should have property count', async () => {
      const getBlocks = await zoobc.getBlocks(p.chaintype, p.limit, p.height);
      expect(getBlocks).to.be.have.haveOwnProperty('count');
      expect(getBlocks.count).to.equal(p.limit);
    });

    it('checking blocks should have property height', async () => {
      const getBlocks = await zoobc.getBlocks(p.chaintype, p.limit, p.height);
      expect(getBlocks).to.be.have.haveOwnProperty('height');
      expect(getBlocks.height).to.equal(p.height);
    });

    it('checking blocksList should return array', async () => {
      const getBlocks = await zoobc.getBlocks(p.chaintype, p.limit, p.height);
      expect(getBlocks.blocksList).to.be.an('array');
    });
  });
});
