// package: model
// file: model/multiSignature.proto

import * as jspb from "google-protobuf";
import * as model_pagination_pb from "../model/pagination_pb";

export class MultiSignatureInfo extends jspb.Message {
  getMinimumsignatures(): number;
  setMinimumsignatures(value: number): void;

  getNonce(): string;
  setNonce(value: string): void;

  getMultisigaddress(): string;
  setMultisigaddress(value: string): void;

  getBlockheight(): number;
  setBlockheight(value: number): void;

  getLatest(): boolean;
  setLatest(value: boolean): void;

  clearAddressesList(): void;
  getAddressesList(): Array<string>;
  setAddressesList(value: Array<string>): void;
  addAddresses(value: string, index?: number): string;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): MultiSignatureInfo.AsObject;
  static toObject(includeInstance: boolean, msg: MultiSignatureInfo): MultiSignatureInfo.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: MultiSignatureInfo, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): MultiSignatureInfo;
  static deserializeBinaryFromReader(message: MultiSignatureInfo, reader: jspb.BinaryReader): MultiSignatureInfo;
}

export namespace MultiSignatureInfo {
  export type AsObject = {
    minimumsignatures: number,
    nonce: string,
    multisigaddress: string,
    blockheight: number,
    latest: boolean,
    addressesList: Array<string>,
  }
}

export class SignatureInfo extends jspb.Message {
  getTransactionhash(): Uint8Array | string;
  getTransactionhash_asU8(): Uint8Array;
  getTransactionhash_asB64(): string;
  setTransactionhash(value: Uint8Array | string): void;

  getSignaturesMap(): jspb.Map<string, Uint8Array | string>;
  clearSignaturesMap(): void;
  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): SignatureInfo.AsObject;
  static toObject(includeInstance: boolean, msg: SignatureInfo): SignatureInfo.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: SignatureInfo, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): SignatureInfo;
  static deserializeBinaryFromReader(message: SignatureInfo, reader: jspb.BinaryReader): SignatureInfo;
}

export namespace SignatureInfo {
  export type AsObject = {
    transactionhash: Uint8Array | string,
    signaturesMap: Array<[string, Uint8Array | string]>,
  }
}

export class MultiSignatureParticipant extends jspb.Message {
  getMultisignatureaddress(): string;
  setMultisignatureaddress(value: string): void;

  getAccountaddress(): string;
  setAccountaddress(value: string): void;

  getAccountaddressindex(): number;
  setAccountaddressindex(value: number): void;

  getLatest(): boolean;
  setLatest(value: boolean): void;

  getBlockheight(): number;
  setBlockheight(value: number): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): MultiSignatureParticipant.AsObject;
  static toObject(includeInstance: boolean, msg: MultiSignatureParticipant): MultiSignatureParticipant.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: MultiSignatureParticipant, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): MultiSignatureParticipant;
  static deserializeBinaryFromReader(message: MultiSignatureParticipant, reader: jspb.BinaryReader): MultiSignatureParticipant;
}

export namespace MultiSignatureParticipant {
  export type AsObject = {
    multisignatureaddress: string,
    accountaddress: string,
    accountaddressindex: number,
    latest: boolean,
    blockheight: number,
  }
}

export class PendingSignature extends jspb.Message {
  getTransactionhash(): Uint8Array | string;
  getTransactionhash_asU8(): Uint8Array;
  getTransactionhash_asB64(): string;
  setTransactionhash(value: Uint8Array | string): void;

  getAccountaddress(): string;
  setAccountaddress(value: string): void;

  getSignature(): Uint8Array | string;
  getSignature_asU8(): Uint8Array;
  getSignature_asB64(): string;
  setSignature(value: Uint8Array | string): void;

  getBlockheight(): number;
  setBlockheight(value: number): void;

  getLatest(): boolean;
  setLatest(value: boolean): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): PendingSignature.AsObject;
  static toObject(includeInstance: boolean, msg: PendingSignature): PendingSignature.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: PendingSignature, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): PendingSignature;
  static deserializeBinaryFromReader(message: PendingSignature, reader: jspb.BinaryReader): PendingSignature;
}

export namespace PendingSignature {
  export type AsObject = {
    transactionhash: Uint8Array | string,
    accountaddress: string,
    signature: Uint8Array | string,
    blockheight: number,
    latest: boolean,
  }
}

export class PendingTransaction extends jspb.Message {
  getSenderaddress(): string;
  setSenderaddress(value: string): void;

  getTransactionhash(): Uint8Array | string;
  getTransactionhash_asU8(): Uint8Array;
  getTransactionhash_asB64(): string;
  setTransactionhash(value: Uint8Array | string): void;

  getTransactionbytes(): Uint8Array | string;
  getTransactionbytes_asU8(): Uint8Array;
  getTransactionbytes_asB64(): string;
  setTransactionbytes(value: Uint8Array | string): void;

  getStatus(): PendingTransactionStatusMap[keyof PendingTransactionStatusMap];
  setStatus(value: PendingTransactionStatusMap[keyof PendingTransactionStatusMap]): void;

  getBlockheight(): number;
  setBlockheight(value: number): void;

  getLatest(): boolean;
  setLatest(value: boolean): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): PendingTransaction.AsObject;
  static toObject(includeInstance: boolean, msg: PendingTransaction): PendingTransaction.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: PendingTransaction, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): PendingTransaction;
  static deserializeBinaryFromReader(message: PendingTransaction, reader: jspb.BinaryReader): PendingTransaction;
}

export namespace PendingTransaction {
  export type AsObject = {
    senderaddress: string,
    transactionhash: Uint8Array | string,
    transactionbytes: Uint8Array | string,
    status: PendingTransactionStatusMap[keyof PendingTransactionStatusMap],
    blockheight: number,
    latest: boolean,
  }
}

export class GetPendingTransactionsRequest extends jspb.Message {
  getSenderaddress(): string;
  setSenderaddress(value: string): void;

  getStatus(): PendingTransactionStatusMap[keyof PendingTransactionStatusMap];
  setStatus(value: PendingTransactionStatusMap[keyof PendingTransactionStatusMap]): void;

  hasPagination(): boolean;
  clearPagination(): void;
  getPagination(): model_pagination_pb.Pagination | undefined;
  setPagination(value?: model_pagination_pb.Pagination): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): GetPendingTransactionsRequest.AsObject;
  static toObject(includeInstance: boolean, msg: GetPendingTransactionsRequest): GetPendingTransactionsRequest.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: GetPendingTransactionsRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): GetPendingTransactionsRequest;
  static deserializeBinaryFromReader(message: GetPendingTransactionsRequest, reader: jspb.BinaryReader): GetPendingTransactionsRequest;
}

export namespace GetPendingTransactionsRequest {
  export type AsObject = {
    senderaddress: string,
    status: PendingTransactionStatusMap[keyof PendingTransactionStatusMap],
    pagination?: model_pagination_pb.Pagination.AsObject,
  }
}

export class GetPendingTransactionsResponse extends jspb.Message {
  getCount(): number;
  setCount(value: number): void;

  getPage(): number;
  setPage(value: number): void;

  clearPendingtransactionsList(): void;
  getPendingtransactionsList(): Array<PendingTransaction>;
  setPendingtransactionsList(value: Array<PendingTransaction>): void;
  addPendingtransactions(value?: PendingTransaction, index?: number): PendingTransaction;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): GetPendingTransactionsResponse.AsObject;
  static toObject(includeInstance: boolean, msg: GetPendingTransactionsResponse): GetPendingTransactionsResponse.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: GetPendingTransactionsResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): GetPendingTransactionsResponse;
  static deserializeBinaryFromReader(message: GetPendingTransactionsResponse, reader: jspb.BinaryReader): GetPendingTransactionsResponse;
}

export namespace GetPendingTransactionsResponse {
  export type AsObject = {
    count: number,
    page: number,
    pendingtransactionsList: Array<PendingTransaction.AsObject>,
  }
}

export class GetPendingTransactionDetailByTransactionHashRequest extends jspb.Message {
  getTransactionhashhex(): string;
  setTransactionhashhex(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): GetPendingTransactionDetailByTransactionHashRequest.AsObject;
  static toObject(includeInstance: boolean, msg: GetPendingTransactionDetailByTransactionHashRequest): GetPendingTransactionDetailByTransactionHashRequest.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: GetPendingTransactionDetailByTransactionHashRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): GetPendingTransactionDetailByTransactionHashRequest;
  static deserializeBinaryFromReader(message: GetPendingTransactionDetailByTransactionHashRequest, reader: jspb.BinaryReader): GetPendingTransactionDetailByTransactionHashRequest;
}

export namespace GetPendingTransactionDetailByTransactionHashRequest {
  export type AsObject = {
    transactionhashhex: string,
  }
}

export class GetPendingTransactionDetailByTransactionHashResponse extends jspb.Message {
  hasPendingtransaction(): boolean;
  clearPendingtransaction(): void;
  getPendingtransaction(): PendingTransaction | undefined;
  setPendingtransaction(value?: PendingTransaction): void;

  clearPendingsignaturesList(): void;
  getPendingsignaturesList(): Array<PendingSignature>;
  setPendingsignaturesList(value: Array<PendingSignature>): void;
  addPendingsignatures(value?: PendingSignature, index?: number): PendingSignature;

  hasMultisignatureinfo(): boolean;
  clearMultisignatureinfo(): void;
  getMultisignatureinfo(): MultiSignatureInfo | undefined;
  setMultisignatureinfo(value?: MultiSignatureInfo): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): GetPendingTransactionDetailByTransactionHashResponse.AsObject;
  static toObject(includeInstance: boolean, msg: GetPendingTransactionDetailByTransactionHashResponse): GetPendingTransactionDetailByTransactionHashResponse.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: GetPendingTransactionDetailByTransactionHashResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): GetPendingTransactionDetailByTransactionHashResponse;
  static deserializeBinaryFromReader(message: GetPendingTransactionDetailByTransactionHashResponse, reader: jspb.BinaryReader): GetPendingTransactionDetailByTransactionHashResponse;
}

export namespace GetPendingTransactionDetailByTransactionHashResponse {
  export type AsObject = {
    pendingtransaction?: PendingTransaction.AsObject,
    pendingsignaturesList: Array<PendingSignature.AsObject>,
    multisignatureinfo?: MultiSignatureInfo.AsObject,
  }
}

export class GetMultisignatureInfoRequest extends jspb.Message {
  getMultisigaddress(): string;
  setMultisigaddress(value: string): void;

  hasPagination(): boolean;
  clearPagination(): void;
  getPagination(): model_pagination_pb.Pagination | undefined;
  setPagination(value?: model_pagination_pb.Pagination): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): GetMultisignatureInfoRequest.AsObject;
  static toObject(includeInstance: boolean, msg: GetMultisignatureInfoRequest): GetMultisignatureInfoRequest.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: GetMultisignatureInfoRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): GetMultisignatureInfoRequest;
  static deserializeBinaryFromReader(message: GetMultisignatureInfoRequest, reader: jspb.BinaryReader): GetMultisignatureInfoRequest;
}

export namespace GetMultisignatureInfoRequest {
  export type AsObject = {
    multisigaddress: string,
    pagination?: model_pagination_pb.Pagination.AsObject,
  }
}

export class GetMultisignatureInfoResponse extends jspb.Message {
  getCount(): number;
  setCount(value: number): void;

  getPage(): number;
  setPage(value: number): void;

  clearMultisignatureinfoList(): void;
  getMultisignatureinfoList(): Array<MultiSignatureInfo>;
  setMultisignatureinfoList(value: Array<MultiSignatureInfo>): void;
  addMultisignatureinfo(value?: MultiSignatureInfo, index?: number): MultiSignatureInfo;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): GetMultisignatureInfoResponse.AsObject;
  static toObject(includeInstance: boolean, msg: GetMultisignatureInfoResponse): GetMultisignatureInfoResponse.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: GetMultisignatureInfoResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): GetMultisignatureInfoResponse;
  static deserializeBinaryFromReader(message: GetMultisignatureInfoResponse, reader: jspb.BinaryReader): GetMultisignatureInfoResponse;
}

export namespace GetMultisignatureInfoResponse {
  export type AsObject = {
    count: number,
    page: number,
    multisignatureinfoList: Array<MultiSignatureInfo.AsObject>,
  }
}

export class GetMultisigAddressByParticipantAddressRequest extends jspb.Message {
  getParticipantaddress(): string;
  setParticipantaddress(value: string): void;

  hasPagination(): boolean;
  clearPagination(): void;
  getPagination(): model_pagination_pb.Pagination | undefined;
  setPagination(value?: model_pagination_pb.Pagination): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): GetMultisigAddressByParticipantAddressRequest.AsObject;
  static toObject(includeInstance: boolean, msg: GetMultisigAddressByParticipantAddressRequest): GetMultisigAddressByParticipantAddressRequest.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: GetMultisigAddressByParticipantAddressRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): GetMultisigAddressByParticipantAddressRequest;
  static deserializeBinaryFromReader(message: GetMultisigAddressByParticipantAddressRequest, reader: jspb.BinaryReader): GetMultisigAddressByParticipantAddressRequest;
}

export namespace GetMultisigAddressByParticipantAddressRequest {
  export type AsObject = {
    participantaddress: string,
    pagination?: model_pagination_pb.Pagination.AsObject,
  }
}

export class GetMultisigAddressByParticipantAddressResponse extends jspb.Message {
  getTotal(): number;
  setTotal(value: number): void;

  clearMultisignaddressesList(): void;
  getMultisignaddressesList(): Array<string>;
  setMultisignaddressesList(value: Array<string>): void;
  addMultisignaddresses(value: string, index?: number): string;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): GetMultisigAddressByParticipantAddressResponse.AsObject;
  static toObject(includeInstance: boolean, msg: GetMultisigAddressByParticipantAddressResponse): GetMultisigAddressByParticipantAddressResponse.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: GetMultisigAddressByParticipantAddressResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): GetMultisigAddressByParticipantAddressResponse;
  static deserializeBinaryFromReader(message: GetMultisigAddressByParticipantAddressResponse, reader: jspb.BinaryReader): GetMultisigAddressByParticipantAddressResponse;
}

export namespace GetMultisigAddressByParticipantAddressResponse {
  export type AsObject = {
    total: number,
    multisignaddressesList: Array<string>,
  }
}

export interface PendingTransactionStatusMap {
  PENDINGTRANSACTIONPENDING: 0;
  PENDINGTRANSACTIONEXECUTED: 1;
  PENDINGTRANSACTIONNOOP: 2;
  PENDINGTRANSACTIONEXPIRED: 3;
}

export const PendingTransactionStatus: PendingTransactionStatusMap;

