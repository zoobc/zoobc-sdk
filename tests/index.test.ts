import 'mocha';
import { expect } from 'chai';
import zoobc from '../src/index';

zoobc.connection('http://18.139.3.139:7001');

describe('Zoobc unit testing', () => {
  it('check connection retun void', async () => {
    const con = await zoobc.connection('http://18.139.3.139:7001');
    expect(con).to.be.an('undefined');
  });

  it('checking blocks should return object', async () => {
    const getBlocks = await zoobc.getBlocks(0, 2, 1);
    expect(getBlocks).to.be.an('object');
  });

  it('checking blockList should return array', async () => {
    const getBlocks = await zoobc.getBlocks(0, 2, 1);
    expect(getBlocks.blocksList).to.be.an('array');
  });

  it('checking block should have property chaintype', async () => {
    const getBlocks = await zoobc.getBlocks(0, 2, 1);
    expect(getBlocks).to.be.have.haveOwnProperty('chaintype');
    expect(getBlocks.chaintype).to.equal(0);
  });

  it('checking block should have property count', async () => {
    const getBlocks = await zoobc.getBlocks(0, 2, 1);
    expect(getBlocks).to.be.have.haveOwnProperty('count');
    expect(getBlocks.count).to.equal(2);
  });

  it('checking block should have property height', async () => {
    const getBlocks = await zoobc.getBlocks(0, 2, 1);
    expect(getBlocks).to.be.have.haveOwnProperty('height');
    expect(getBlocks.height).to.equal(1);
  });
});
