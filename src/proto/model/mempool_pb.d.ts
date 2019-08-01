// package: model
// file: model/mempool.proto

import * as jspb from "google-protobuf";

export class MempoolTransaction extends jspb.Message {
  getId(): number;
  setId(value: number): void;

  getFeeperbyte(): number;
  setFeeperbyte(value: number): void;

  getArrivaltimestamp(): number;
  setArrivaltimestamp(value: number): void;

  getTransactionbytes(): Uint8Array | string;
  getTransactionbytes_asU8(): Uint8Array;
  getTransactionbytes_asB64(): string;
  setTransactionbytes(value: Uint8Array | string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): MempoolTransaction.AsObject;
  static toObject(includeInstance: boolean, msg: MempoolTransaction): MempoolTransaction.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: MempoolTransaction, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): MempoolTransaction;
  static deserializeBinaryFromReader(message: MempoolTransaction, reader: jspb.BinaryReader): MempoolTransaction;
}

export namespace MempoolTransaction {
  export type AsObject = {
    id: number,
    feeperbyte: number,
    arrivaltimestamp: number,
    transactionbytes: Uint8Array | string,
  }
}

export class GetMempoolTransactionRequest extends jspb.Message {
  getTransactionbytes(): Uint8Array | string;
  getTransactionbytes_asU8(): Uint8Array;
  getTransactionbytes_asB64(): string;
  setTransactionbytes(value: Uint8Array | string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): GetMempoolTransactionRequest.AsObject;
  static toObject(includeInstance: boolean, msg: GetMempoolTransactionRequest): GetMempoolTransactionRequest.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: GetMempoolTransactionRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): GetMempoolTransactionRequest;
  static deserializeBinaryFromReader(message: GetMempoolTransactionRequest, reader: jspb.BinaryReader): GetMempoolTransactionRequest;
}

export namespace GetMempoolTransactionRequest {
  export type AsObject = {
    transactionbytes: Uint8Array | string,
  }
}

export class GetMempoolTransactionsRequest extends jspb.Message {
  getFrom(): number;
  setFrom(value: number): void;

  getTo(): number;
  setTo(value: number): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): GetMempoolTransactionsRequest.AsObject;
  static toObject(includeInstance: boolean, msg: GetMempoolTransactionsRequest): GetMempoolTransactionsRequest.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: GetMempoolTransactionsRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): GetMempoolTransactionsRequest;
  static deserializeBinaryFromReader(message: GetMempoolTransactionsRequest, reader: jspb.BinaryReader): GetMempoolTransactionsRequest;
}

export namespace GetMempoolTransactionsRequest {
  export type AsObject = {
    from: number,
    to: number,
  }
}

export class GetMempoolTransactionsResponse extends jspb.Message {
  getMempoolsize(): number;
  setMempoolsize(value: number): void;

  clearMempooltransactionsList(): void;
  getMempooltransactionsList(): Array<MempoolTransaction>;
  setMempooltransactionsList(value: Array<MempoolTransaction>): void;
  addMempooltransactions(value?: MempoolTransaction, index?: number): MempoolTransaction;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): GetMempoolTransactionsResponse.AsObject;
  static toObject(includeInstance: boolean, msg: GetMempoolTransactionsResponse): GetMempoolTransactionsResponse.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: GetMempoolTransactionsResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): GetMempoolTransactionsResponse;
  static deserializeBinaryFromReader(message: GetMempoolTransactionsResponse, reader: jspb.BinaryReader): GetMempoolTransactionsResponse;
}

export namespace GetMempoolTransactionsResponse {
  export type AsObject = {
    mempoolsize: number,
    mempooltransactionsList: Array<MempoolTransaction.AsObject>,
  }
}

