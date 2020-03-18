import 'mocha';
import { expect } from 'chai';
import zoobc from '../src';
import { FakeTransportBuilder } from '@improbable-eng/grpc-web-fake-transport';
import { GetBlocksResponse, BlockExtendedInfo, Block } from '../grpc/model/block_pb';

interface IMockBlockTransport {
  id?: string;
  height?: number;
}

function mockBlocksTransport(height: number, limit?: number) {
  const blocksResponse = new GetBlocksResponse();
  blocksResponse.setHeight(height);
  if (limit) blocksResponse.setCount(limit);
  return new FakeTransportBuilder().withMessages([blocksResponse]).build();
}

function mockBlockTransport(params: IMockBlockTransport) {
  const blockInfoResponse = new BlockExtendedInfo();
  const blockResponse = new Block();

  if (params) {
    const { height, id } = params;
    if (id) blockResponse.setId(id);
    if (height) blockResponse.setHeight(height);
  }

  blockInfoResponse.setBlock(blockResponse);

  return new FakeTransportBuilder().withMessages([blockInfoResponse]).build();
}

describe('Block Unit Testing :', () => {
  beforeEach(() => {
    const hosts = [{ host: 'http://85.90.246.90:8002', name: '168 Testnet' }];
    zoobc.Network.list(hosts);
  });
  describe('getBlocks', () => {
    it('getBlocks should return list block from height 0', async () => {
      const height = 0;
      const blocks = await zoobc.Block.getBlocks({ height, transport: mockBlocksTransport(height) });
      expect(blocks).to.be.an('object');
      expect(blocks.height).to.be.equal(height);
      expect(blocks.blocksList).to.be.an('array');
    });

    it('getBlocks should return 2 blocks from height 10 ', async () => {
      const height = 10;
      const limit = 2;
      const blocks = await zoobc.Block.getBlocks({ height: 0, limit: 2, transport: mockBlocksTransport(height, limit) });
      expect(blocks).to.be.an('object');
      expect(blocks.height).to.be.equal(height);
      expect(blocks.count).to.be.equal(limit);
      expect(blocks.blocksList).to.be.an('array');
    });
  });

  describe('getBlockById', () => {
    it('getBlockById should return block detail with blockID 1070983609761144356', async () => {
      const blockId = '1070983609761144356';
      const res = await zoobc.Block.getBlockById(blockId, mockBlockTransport({ id: blockId }));
      expect(res).to.be.an('object');
      expect(res.block).to.be.an('object');
      expect(res?.block?.id).to.be.equal(blockId);
    });
  });

  describe('getBlockByHeight', () => {
    it('getBlockByHeight should return block detail with blockHeight 10', async () => {
      const blockHeight = 10;
      const res = await zoobc.Block.getBlockByHeight(blockHeight, mockBlockTransport({ height: blockHeight }));
      expect(res).to.be.an('object');
      expect(res.block).to.be.an('object');
      expect(res?.block?.height).to.be.equal(blockHeight);
    });
  });
});
