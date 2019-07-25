// package: model
// file: model/accountBalance.proto

import * as jspb from "google-protobuf";

export class AccountBalance extends jspb.Message {
  getAccountid(): Uint8Array | string;
  getAccountid_asU8(): Uint8Array;
  getAccountid_asB64(): string;
  setAccountid(value: Uint8Array | string): void;

  getBlockheight(): number;
  setBlockheight(value: number): void;

  getSpendablebalance(): number;
  setSpendablebalance(value: number): void;

  getBalance(): number;
  setBalance(value: number): void;

  getPoprevenue(): number;
  setPoprevenue(value: number): void;

  getLatest(): boolean;
  setLatest(value: boolean): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): AccountBalance.AsObject;
  static toObject(includeInstance: boolean, msg: AccountBalance): AccountBalance.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: AccountBalance, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): AccountBalance;
  static deserializeBinaryFromReader(message: AccountBalance, reader: jspb.BinaryReader): AccountBalance;
}

export namespace AccountBalance {
  export type AsObject = {
    accountid: Uint8Array | string,
    blockheight: number,
    spendablebalance: number,
    balance: number,
    poprevenue: number,
    latest: boolean,
  }
}

export class GetAccountBalanceRequest extends jspb.Message {
  getAccounttype(): number;
  setAccounttype(value: number): void;

  getAccountaddress(): string;
  setAccountaddress(value: string): void;

  getBlockheight(): number;
  setBlockheight(value: number): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): GetAccountBalanceRequest.AsObject;
  static toObject(includeInstance: boolean, msg: GetAccountBalanceRequest): GetAccountBalanceRequest.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: GetAccountBalanceRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): GetAccountBalanceRequest;
  static deserializeBinaryFromReader(message: GetAccountBalanceRequest, reader: jspb.BinaryReader): GetAccountBalanceRequest;
}

export namespace GetAccountBalanceRequest {
  export type AsObject = {
    accounttype: number,
    accountaddress: string,
    blockheight: number,
  }
}

export class GetAccountBalancesRequest extends jspb.Message {
  getBalancelowerthan(): number;
  setBalancelowerthan(value: number): void;

  getBalancehigherthan(): number;
  setBalancehigherthan(value: number): void;

  getSpendablebalancelowerthan(): number;
  setSpendablebalancelowerthan(value: number): void;

  getSpendablebalancehigherthan(): number;
  setSpendablebalancehigherthan(value: number): void;

  getPoprevenuebalancelowerthan(): number;
  setPoprevenuebalancelowerthan(value: number): void;

  getPoprevenuebalancehigherthan(): number;
  setPoprevenuebalancehigherthan(value: number): void;

  getBlockheight(): number;
  setBlockheight(value: number): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): GetAccountBalancesRequest.AsObject;
  static toObject(includeInstance: boolean, msg: GetAccountBalancesRequest): GetAccountBalancesRequest.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: GetAccountBalancesRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): GetAccountBalancesRequest;
  static deserializeBinaryFromReader(message: GetAccountBalancesRequest, reader: jspb.BinaryReader): GetAccountBalancesRequest;
}

export namespace GetAccountBalancesRequest {
  export type AsObject = {
    balancelowerthan: number,
    balancehigherthan: number,
    spendablebalancelowerthan: number,
    spendablebalancehigherthan: number,
    poprevenuebalancelowerthan: number,
    poprevenuebalancehigherthan: number,
    blockheight: number,
  }
}

export class GetAccountBalancesResponse extends jspb.Message {
  getAccountbalancesize(): number;
  setAccountbalancesize(value: number): void;

  clearAccountbalanceList(): void;
  getAccountbalanceList(): Array<AccountBalance>;
  setAccountbalanceList(value: Array<AccountBalance>): void;
  addAccountbalance(value?: AccountBalance, index?: number): AccountBalance;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): GetAccountBalancesResponse.AsObject;
  static toObject(includeInstance: boolean, msg: GetAccountBalancesResponse): GetAccountBalancesResponse.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: GetAccountBalancesResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): GetAccountBalancesResponse;
  static deserializeBinaryFromReader(message: GetAccountBalancesResponse, reader: jspb.BinaryReader): GetAccountBalancesResponse;
}

export namespace GetAccountBalancesResponse {
  export type AsObject = {
    accountbalancesize: number,
    accountbalanceList: Array<AccountBalance.AsObject>,
  }
}

