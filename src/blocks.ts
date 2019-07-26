import { grpc } from '@improbable-eng/grpc-web';
import { GetBlocksRequest } from './proto/model/block_pb';
import { BlockService } from './proto/service/block_pb_service';

interface Callback {
  (error: any, result: any): void;
}

export default class Blocks {
  host: string;

  constructor(host: string) {
    this.host = host;
  }

  getBlocks(ChainType: number, Limit: number, Height: number, callback: Callback): void {
    const getBlockRequest = new GetBlocksRequest();
    getBlockRequest.setChaintype(ChainType);
    getBlockRequest.setHeight(Height);
    getBlockRequest.setLimit(Limit);

    grpc.unary(BlockService.GetBlocks, {
      request: getBlockRequest,
      host: this.host,
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
