// package: model
// file: model/block.proto

import * as jspb from "google-protobuf";
import * as model_transaction_pb from "../model/transaction_pb";

export class Block extends jspb.Message {
  getId(): string;
  setId(value: string): void;

  getPreviousblockhash(): Uint8Array | string;
  getPreviousblockhash_asU8(): Uint8Array;
  getPreviousblockhash_asB64(): string;
  setPreviousblockhash(value: Uint8Array | string): void;

  getHeight(): number;
  setHeight(value: number): void;

  getTimestamp(): number;
  setTimestamp(value: number): void;

  getBlockseed(): Uint8Array | string;
  getBlockseed_asU8(): Uint8Array;
  getBlockseed_asB64(): string;
  setBlockseed(value: Uint8Array | string): void;

  getBlocksignature(): Uint8Array | string;
  getBlocksignature_asU8(): Uint8Array;
  getBlocksignature_asB64(): string;
  setBlocksignature(value: Uint8Array | string): void;

  getCumulativedifficulty(): string;
  setCumulativedifficulty(value: string): void;

  getSmithscale(): number;
  setSmithscale(value: number): void;

  getBlocksmithid(): Uint8Array | string;
  getBlocksmithid_asU8(): Uint8Array;
  getBlocksmithid_asB64(): string;
  setBlocksmithid(value: Uint8Array | string): void;

  getTotalamount(): number;
  setTotalamount(value: number): void;

  getTotalfee(): number;
  setTotalfee(value: number): void;

  getTotalcoinbase(): number;
  setTotalcoinbase(value: number): void;

  getVersion(): number;
  setVersion(value: number): void;

  getPayloadlength(): number;
  setPayloadlength(value: number): void;

  getPayloadhash(): Uint8Array | string;
  getPayloadhash_asU8(): Uint8Array;
  getPayloadhash_asB64(): string;
  setPayloadhash(value: Uint8Array | string): void;

  clearTransactionsList(): void;
  getTransactionsList(): Array<model_transaction_pb.Transaction>;
  setTransactionsList(value: Array<model_transaction_pb.Transaction>): void;
  addTransactions(value?: model_transaction_pb.Transaction, index?: number): model_transaction_pb.Transaction;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): Block.AsObject;
  static toObject(includeInstance: boolean, msg: Block): Block.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: Block, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): Block;
  static deserializeBinaryFromReader(message: Block, reader: jspb.BinaryReader): Block;
}

export namespace Block {
  export type AsObject = {
    id: string,
    previousblockhash: Uint8Array | string,
    height: number,
    timestamp: number,
    blockseed: Uint8Array | string,
    blocksignature: Uint8Array | string,
    cumulativedifficulty: string,
    smithscale: number,
    blocksmithid: Uint8Array | string,
    totalamount: number,
    totalfee: number,
    totalcoinbase: number,
    version: number,
    payloadlength: number,
    payloadhash: Uint8Array | string,
    transactionsList: Array<model_transaction_pb.Transaction.AsObject>,
  }
}

export class GetBlockRequest extends jspb.Message {
  getChaintype(): number;
  setChaintype(value: number): void;

  getId(): string;
  setId(value: string): void;

  getHeight(): number;
  setHeight(value: number): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): GetBlockRequest.AsObject;
  static toObject(includeInstance: boolean, msg: GetBlockRequest): GetBlockRequest.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: GetBlockRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): GetBlockRequest;
  static deserializeBinaryFromReader(message: GetBlockRequest, reader: jspb.BinaryReader): GetBlockRequest;
}

export namespace GetBlockRequest {
  export type AsObject = {
    chaintype: number,
    id: string,
    height: number,
  }
}

export class GetBlocksRequest extends jspb.Message {
  getChaintype(): number;
  setChaintype(value: number): void;

  getLimit(): number;
  setLimit(value: number): void;

  getHeight(): number;
  setHeight(value: number): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): GetBlocksRequest.AsObject;
  static toObject(includeInstance: boolean, msg: GetBlocksRequest): GetBlocksRequest.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: GetBlocksRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): GetBlocksRequest;
  static deserializeBinaryFromReader(message: GetBlocksRequest, reader: jspb.BinaryReader): GetBlocksRequest;
}

export namespace GetBlocksRequest {
  export type AsObject = {
    chaintype: number,
    limit: number,
    height: number,
  }
}

export class GetBlocksResponse extends jspb.Message {
  getChaintype(): number;
  setChaintype(value: number): void;

  getCount(): number;
  setCount(value: number): void;

  getHeight(): number;
  setHeight(value: number): void;

  clearBlocksList(): void;
  getBlocksList(): Array<Block>;
  setBlocksList(value: Array<Block>): void;
  addBlocks(value?: Block, index?: number): Block;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): GetBlocksResponse.AsObject;
  static toObject(includeInstance: boolean, msg: GetBlocksResponse): GetBlocksResponse.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: GetBlocksResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): GetBlocksResponse;
  static deserializeBinaryFromReader(message: GetBlocksResponse, reader: jspb.BinaryReader): GetBlocksResponse;
}

export namespace GetBlocksResponse {
  export type AsObject = {
    chaintype: number,
    count: number,
    height: number,
    blocksList: Array<Block.AsObject>,
  }
}

