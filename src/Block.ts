import { GetBlocksResponse, GetBlocksRequest, GetBlockRequest, BlockExtendedInfo } from '../grpc/model/block_pb';
import { BlockServiceClient } from '../grpc/service/block_pb_service';
import Network from './Network';

export type BlocksResponse = GetBlocksResponse.AsObject;
export type BlockResponse = BlockExtendedInfo.AsObject;

export interface BlockListParams {
  height: number;
  limit?: number;
}

function getBlocks(params: BlockListParams): Promise<BlocksResponse> {
  return new Promise((resolve, reject) => {
    const networkIP = Network.selected();
    const request = new GetBlocksRequest();

    const { height, limit } = params;
    request.setHeight(height);
    request.setLimit(limit || 10);

    const client = new BlockServiceClient(networkIP.host);
    client.getBlocks(request, (err, res) => {
      if (err) reject(err);
      if (res) resolve(res.toObject());
    });
  });
}

function getBlockById(id: string): Promise<BlockResponse> {
  return new Promise((resolve, reject) => {
    const networkIP = Network.selected();
    const request = new GetBlockRequest();

    request.setId(id);

    const client = new BlockServiceClient(networkIP.host);
    client.getBlock(request, (err, res) => {
      if (err) reject(err);
      if (res) resolve(res.toObject());
    });
  });
}

function getBlockByHeight(height: number): Promise<BlockResponse> {
  return new Promise((resolve, reject) => {
    const networkIP = Network.selected();
    const request = new GetBlockRequest();

    request.setHeight(height);

    const client = new BlockServiceClient(networkIP.host);
    client.getBlock(request, (err, res) => {
      if (err) reject(err);
      if (res) resolve(res.toObject());
    });
  });
}

export default { getBlocks, getBlockById, getBlockByHeight };
