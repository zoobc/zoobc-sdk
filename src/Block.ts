import { GetBlocksResponse, GetBlocksRequest, GetBlockRequest, BlockExtendedInfo } from '../grpc/model/block_pb';
import { BlockServiceClient } from '../grpc/service/block_pb_service';
import Network from './Network';
import { RpcOptions } from '@improbable-eng/grpc-web/dist/typings/client';
import { TransportFactory } from '@improbable-eng/grpc-web/dist/typings/transports/Transport';

export interface BlockListParams {
  height: number;
  limit?: number;
  transport?: TransportFactory;
}

function getBlocks(params: BlockListParams): Promise<GetBlocksResponse.AsObject> {
  return new Promise((resolve, reject) => {
    const networkIP = Network.selected();
    const request = new GetBlocksRequest();
    const clientOptions: RpcOptions = {};

    const { height, limit, transport } = params;
    request.setHeight(height);
    request.setLimit(limit || 10);
    if (transport) clientOptions.transport = transport;

    const client = new BlockServiceClient(networkIP.host, clientOptions);
    client.getBlocks(request, (err, res) => {
      if (err) reject(err);
      if (res) resolve(res.toObject());
    });
  });
}

function getBlockById(id: string, transport?: TransportFactory): Promise<BlockExtendedInfo.AsObject> {
  return new Promise((resolve, reject) => {
    const networkIP = Network.selected();
    const request = new GetBlockRequest();
    const clientOptions: RpcOptions = {};

    request.setId(id);
    if (transport) clientOptions.transport = transport;

    const client = new BlockServiceClient(networkIP.host, clientOptions);
    client.getBlock(request, (err, res) => {
      if (err) reject(err);
      if (res) resolve(res.toObject());
    });
  });
}

function getBlockByHeight(height: number, transport?: TransportFactory): Promise<BlockExtendedInfo.AsObject> {
  return new Promise((resolve, reject) => {
    const networkIP = Network.selected();
    const request = new GetBlockRequest();
    const clientOptions: RpcOptions = {};

    request.setHeight(height);
    if (transport) clientOptions.transport = transport;

    const client = new BlockServiceClient(networkIP.host, clientOptions);
    client.getBlock(request, (err, res) => {
      if (err) reject(err);
      if (res) resolve(res.toObject());
    });
  });
}

export default { getBlocks, getBlockById, getBlockByHeight };
