import { grpc } from '@improbable-eng/grpc-web';
import { GetBlocksRequest, GetBlockRequest } from './proto/model/block_pb';
import { GetTransactionsRequest, GetTransactionRequest } from './proto/model/transaction_pb';
import { BlockService } from './proto/service/block_pb_service';
import { TransactionService } from './proto/service/transaction_pb_service';

interface Callback {
  (error: any, result: any): void;
}

declare const XMLHttpRequest: any;
let awaitingExecution: (() => void)[] | null = null;

function runCallbacks() {
  if (awaitingExecution) {
    const thisCallbackSet = awaitingExecution;
    awaitingExecution = null;
    for (let i = 0; i < thisCallbackSet.length; i++) {
      try {
        thisCallbackSet[i]();
      } catch (e) {
        if (awaitingExecution === null) {
          awaitingExecution = [];
          setTimeout(() => {
            runCallbacks();
          }, 0);
        }
        for (let k = thisCallbackSet.length - 1; k > i; k--) {
          awaitingExecution.unshift(thisCallbackSet[k]);
        }
        throw e;
      }
    }
  }
}

function detach(cb: () => void) {
  if (awaitingExecution !== null) {
    awaitingExecution.push(cb);
    return;
  }
  awaitingExecution = [cb];
  setTimeout(() => {
    runCallbacks();
  }, 0);
}

class XHR implements grpc.Transport {
  options: grpc.TransportOptions;
  xhr: any = null;
  metadata: grpc.Metadata | null = null;

  constructor(transportOptions: grpc.TransportOptions) {
    this.options = transportOptions;
  }

  onLoadEvent() {
    const result = new Uint8Array(this.xhr.response);
    detach(() => {
      this.options.onChunk(result);
    });
    detach(() => {
      this.options.onEnd();
    });
  }

  onStateChange() {
    if (this.xhr.readyState === XMLHttpRequest.HEADERS_RECEIVED) {
      detach(() => {
        this.options.onHeaders(
          new grpc.Metadata(this.xhr.getAllResponseHeaders()),
          this.xhr.status,
        );
      });
    }
  }

  sendMessage(msgBytes: Uint8Array) {
    this.xhr.send(msgBytes);
  }

  finishSend() {}

  start(metadata: grpc.Metadata) {
    this.metadata = metadata;
    const xhr = new XMLHttpRequest();
    this.xhr = xhr;
    xhr.open('POST', this.options.url);
    (xhr as any).responseType = 'arraybuffer';
    this.metadata.forEach((key, values) => {
      xhr.setRequestHeader(key, values.join(', '));
    });
    xhr.addEventListener('readystatechange', this.onStateChange.bind(this));
    xhr.addEventListener('loadend', this.onLoadEvent.bind(this));
    xhr.addEventListener('error', (err: any) => {
      detach(() => {
        this.options.onEnd(err.error);
      });
    });
  }

  cancel() {
    this.xhr.abort();
  }
}

function xhrTransport(): grpc.TransportFactory {
  return (opts: grpc.TransportOptions) => {
    return new XHR(opts);
  };
}

class ZooBC {
  private _host: string = '';

  get connection(): string {
    return this._host;
  }

  set connection(host: string) {
    this._host = host;
  }

  httpTransport(nodeHttpTransport: grpc.TransportFactory) {
    grpc.setDefaultTransport(nodeHttpTransport);
  }

  getBlocks(ChainType: number, Limit: number, Height: number, callback: Callback): void {
    const request = new GetBlocksRequest();
    request.setChaintype(ChainType);
    request.setHeight(Height);
    request.setLimit(Limit);

    grpc.unary(BlockService.GetBlocks, {
      request: request,
      host: this._host,
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

  getBlock(ChainType: number, ID: string = '0', Height: number = 0, callback: Callback): void {
    const request = new GetBlockRequest();
    request.setChaintype(ChainType);
    request.setId(ID);
    request.setHeight(Height);

    grpc.unary(BlockService.GetBlock, {
      request: request,
      host: this._host,
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

  getTransaction(ID: string = '0', callback: Callback): void {
    const request = new GetTransactionRequest();
    request.setId(ID);

    grpc.unary(TransactionService.GetTransaction, {
      request: request,
      host: this._host,
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

function httpTransport(nodeHttpTransport: grpc.TransportFactory): void {
  zoobc.httpTransport(nodeHttpTransport);
}

function getBlocks(ChainType: number, Limit: number, Height: number): any {
  return new Promise((resolve, reject) => {
    zoobc.getBlocks(ChainType, Limit, Height, (err: any, resp: any) => {
      if (err) return reject(err);
      return resolve(resp);
    });
  });
}

function getBlock(ChainType: number, ID: string = '0', Height = 0): any {
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

function getTransaction(ID: string = '0'): any {
  return new Promise((resolve, reject) => {
    zoobc.getTransaction(ID, (err: any, resp: any) => {
      if (err) return reject(err);
      return resolve(resp);
    });
  });
}

export default {
  connection,
  httpTransport,
  getBlocks,
  getBlock,
  getTransactions,
  getTransaction,
  xhrTransport,
};
