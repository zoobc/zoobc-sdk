import { grpc } from '@improbable-eng/grpc-web';
import { NodeHttpTransport } from '@improbable-eng/grpc-web-node-http-transport';
import { GetBlocksRequest, GetBlockRequest } from './proto/model/block_pb';
import { GetTransactionsRequest, GetTransactionRequest } from './proto/model/transaction_pb';
import { BlockService } from './proto/service/block_pb_service';
import { TransactionService } from './proto/service/transaction_pb_service';

interface Callback {
  (error: any, result: any): void;
}

class ZooBC {
  private _host: string = '';

  get connection(): string {
    return this._host;
  }

  set connection(host: string) {
    this._host = host;
  }

  getBlocks(ChainType: number, Limit: number, Height: number, callback: Callback): void {
    const request = new GetBlocksRequest();
    request.setChaintype(ChainType);
    request.setHeight(Height);
    request.setLimit(Limit);

    grpc.unary(BlockService.GetBlocks, {
      request: request,
      host: this._host,
      transport: NodeHttpTransport(),
      onEnd: (res: any) => {
        const { status, statusMessage, message } = res;
        if (status === grpc.Code.OK && message) {
          callback(null, message.toObject());
        } else {
          callback(`Error Blocks: ${statusMessage}`, null);
        }
      },
    });
  }

  getBlock(ChainType: number, ID = '0', Height = 0, callback: Callback): void {
    const request = new GetBlockRequest();
    request.setChaintype(ChainType);
    request.setId(ID);
    request.setHeight(Height);

    grpc.unary(BlockService.GetBlock, {
      request: request,
      host: this._host,
      transport: NodeHttpTransport(),
      onEnd: (res: any) => {
        const { status, statusMessage, message } = res;
        if (status === grpc.Code.OK && message) {
          callback(null, message.toObject());
        } else {
          callback(`Error Block: ${statusMessage}`, null);
        }
      },
    });
  }

  getTransactions(Limit: number, Offset: number, callback: Callback): void {
    const request = new GetTransactionsRequest();
    request.setLimit(Limit);
    request.setOffset(Offset);

    grpc.unary(TransactionService.GetTransactions, {
      request: request,
      host: this._host,
      transport: NodeHttpTransport(),
      onEnd: (res: any) => {
        const { status, statusMessage, message } = res;
        if (status === grpc.Code.OK && message) {
          callback(null, message.toObject());
        } else {
          callback(`Error Transactions: ${statusMessage}`, null);
        }
      },
    });
  }

  getTransaction(ID = '0', callback: Callback): void {
    const request = new GetTransactionRequest();
    request.setId(ID);

    grpc.unary(TransactionService.GetTransaction, {
      request: request,
      host: this._host,
      transport: NodeHttpTransport(),
      onEnd: (res: any) => {
        const { status, statusMessage, message } = res;
        if (status === grpc.Code.OK && message) {
          callback(null, message.toObject());
        } else {
          callback(`Error Transaction: ${statusMessage}`, null);
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

function getBlock(ChainType: number, ID = '0', Height = 0): any {
  return new Promise((resolve, reject) => {
    zoobc.getBlock(ChainType, ID, Height, (err: any, resp: any) => {
      if (err) return reject(err);
      return resolve(resp);
    });
  });
}

function getTransactions(Limit: number, Offset = 0): any {
  return new Promise((resolve, reject) => {
    zoobc.getTransactions(Limit, Offset, (err: any, resp: any) => {
      if (err) return reject(err);
      return resolve(resp);
    });
  });
}

function getTransaction(ID = '0'): any {
  return new Promise((resolve, reject) => {
    zoobc.getTransaction(ID, (err: any, resp: any) => {
      if (err) return reject(err);
      return resolve(resp);
    });
  });
}

export default { connection, getBlocks, getBlock, getTransactions, getTransaction };
