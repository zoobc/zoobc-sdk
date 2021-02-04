import { GetBlocksResponse, GetBlocksRequest, GetBlockRequest, GetBlockResponse } from '../grpc/model/block_pb';
import { BlockServiceClient } from '../grpc/service/block_pb_service';
import Network from './Network';

export type BlocksResponse = GetBlocksResponse.AsObject;
export type BlockResponse = GetBlockResponse.AsObject;

function getBlocks(height: number, limit?: number): Promise<BlocksResponse> {
  return new Promise((resolve, reject) => {
    // const networkIP = Network.selected();
    const request = new GetBlocksRequest();

    request.setHeight(height);
    request.setLimit(limit || 10);

    /*
    const client = new BlockServiceClient(networkIP.host);

    client.getBlocks(request, (err, res) => {
      console.log('get blocks error:', err);
      if (err) {
        const { code, message, metadata } = err;
        reject({ code, message, metadata });
      }
      if (res) resolve(res.toObject());
    });
    */

    Network.request(BlockServiceClient, 'getBlocks', request)
      .catch(err => {
        const { code, message, metadata } = err;
        reject({ code, message, metadata });
      })
      .then(res => {
        resolve(res.toObject());
      });
  });
}

function getBlockById(id: string): Promise<BlockResponse> {
  return new Promise((resolve, reject) => {
    // const networkIP = Network.selected();
    const request = new GetBlockRequest();

    request.setId(id);

    Network.request(BlockServiceClient, 'getBlock', request)
      .catch(err => {
        const { code, message, metadata } = err;
        reject({ code, message, metadata });
      })
      .then(res => {
        resolve(res.toObject());
      });

    /*const client = new BlockServiceClient(networkIP.host);
    client.getBlock(request, (err, res) => {
      if (err) {
        const { code, message, metadata } = err;
        reject({ code, message, metadata });
      }
      if (res) resolve(res.toObject());
    });*/
  });
}

function getBlockByHeight(height: number): Promise<BlockResponse> {
  return new Promise((resolve, reject) => {
    // const networkIP = Network.selected();
    const request = new GetBlockRequest();

    request.setHeight(height);

    Network.request(BlockServiceClient, 'getBlock', request)
      .catch(err => {
        const { code, message, metadata } = err;
        reject({ code, message, metadata });
      })
      .then(res => {
        resolve(res.toObject());
      });

    /*const client = new BlockServiceClient(networkIP.host);
    client.getBlock(request, (err, res) => {
      if (err) {
        const { code, message, metadata } = err;
        reject({ code, message, metadata });
      }
      if (res) resolve(res.toObject());
    });*/
  });
}

export default { getBlocks, getBlockById, getBlockByHeight };
