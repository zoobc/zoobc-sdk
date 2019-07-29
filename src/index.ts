import { grpc } from '@improbable-eng/grpc-web';
import { NodeHttpTransport } from '@improbable-eng/grpc-web-node-http-transport';
import { GetBlocksRequest } from './proto/model/block_pb';
import { BlockService } from './proto/service/block_pb_service';

interface Callback {
  (error: any, result: any): void;
}
export class ZooBC {
  private _host: string = '';

  get connection(): string {
    return this._host;
  }

  set connection(host: string) {
    this._host = host;
  }

  getBlocks(ChainType: number, Limit: number, Height: number, callback: Callback): void {
    const getBlockRequest = new GetBlocksRequest();
    getBlockRequest.setChaintype(ChainType);
    getBlockRequest.setHeight(Height);
    getBlockRequest.setLimit(Limit);

    grpc.unary(BlockService.GetBlocks, {
      request: getBlockRequest,
      host: this._host,
      transport: NodeHttpTransport(),
      onEnd: res => {
        const { status, statusMessage, message } = res;
        if (status === grpc.Code.OK && message) {
          callback(null, message.toObject());
        } else {
          callback(`Error Blocks: ${statusMessage}`, null);
        }
      },
    });
  }
}

const zoobc = new ZooBC();

function connection(host: string): void {
  zoobc.connection = host;
}

function getBlocks(ChainType: number, Limit: number, Height: number): any {
  return new Promise((resolve, reject) => {
    zoobc.getBlocks(ChainType, Limit, Height, (err: any, resp: any) => {
      if (err) return reject(err);
      return resolve(resp);
    });
  });
}

export default { connection, getBlocks };
