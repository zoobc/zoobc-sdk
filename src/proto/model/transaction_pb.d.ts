// package: model
// file: model/transaction.proto

import * as jspb from "google-protobuf";

export class Transaction extends jspb.Message {
  getVersion(): number;
  setVersion(value: number): void;

  getId(): string;
  setId(value: string): void;

  getBlockid(): number;
  setBlockid(value: number): void;

  getHeight(): number;
  setHeight(value: number): void;

  getSenderaccounttype(): number;
  setSenderaccounttype(value: number): void;

  getSenderaccountaddress(): string;
  setSenderaccountaddress(value: string): void;

  getRecipientaccounttype(): number;
  setRecipientaccounttype(value: number): void;

  getRecipientaccountaddress(): string;
  setRecipientaccountaddress(value: string): void;

  getTransactiontype(): number;
  setTransactiontype(value: number): void;

  getFee(): number;
  setFee(value: number): void;

  getTimestamp(): number;
  setTimestamp(value: number): void;

  getTransactionhash(): Uint8Array | string;
  getTransactionhash_asU8(): Uint8Array;
  getTransactionhash_asB64(): string;
  setTransactionhash(value: Uint8Array | string): void;

  getTransactionbodylength(): number;
  setTransactionbodylength(value: number): void;

  getTransactionbodybytes(): Uint8Array | string;
  getTransactionbodybytes_asU8(): Uint8Array;
  getTransactionbodybytes_asB64(): string;
  setTransactionbodybytes(value: Uint8Array | string): void;

  hasEmptytransactionbody(): boolean;
  clearEmptytransactionbody(): void;
  getEmptytransactionbody(): EmptyTransactionBody | undefined;
  setEmptytransactionbody(value?: EmptyTransactionBody): void;

  hasSendmoneytransactionbody(): boolean;
  clearSendmoneytransactionbody(): void;
  getSendmoneytransactionbody(): SendMoneyTransactionBody | undefined;
  setSendmoneytransactionbody(value?: SendMoneyTransactionBody): void;

  hasNoderegistrationtransactionbody(): boolean;
  clearNoderegistrationtransactionbody(): void;
  getNoderegistrationtransactionbody(): NodeRegistrationTransactionBody | undefined;
  setNoderegistrationtransactionbody(value?: NodeRegistrationTransactionBody): void;

  getSignature(): Uint8Array | string;
  getSignature_asU8(): Uint8Array;
  getSignature_asB64(): string;
  setSignature(value: Uint8Array | string): void;

  getTransactionbodyCase(): Transaction.TransactionbodyCase;
  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): Transaction.AsObject;
  static toObject(includeInstance: boolean, msg: Transaction): Transaction.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: Transaction, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): Transaction;
  static deserializeBinaryFromReader(message: Transaction, reader: jspb.BinaryReader): Transaction;
}

export namespace Transaction {
  export type AsObject = {
    version: number,
    id: string,
    blockid: number,
    height: number,
    senderaccounttype: number,
    senderaccountaddress: string,
    recipientaccounttype: number,
    recipientaccountaddress: string,
    transactiontype: number,
    fee: number,
    timestamp: number,
    transactionhash: Uint8Array | string,
    transactionbodylength: number,
    transactionbodybytes: Uint8Array | string,
    emptytransactionbody?: EmptyTransactionBody.AsObject,
    sendmoneytransactionbody?: SendMoneyTransactionBody.AsObject,
    noderegistrationtransactionbody?: NodeRegistrationTransactionBody.AsObject,
    signature: Uint8Array | string,
  }

  export enum TransactionbodyCase {
    TRANSACTIONBODY_NOT_SET = 0,
    EMPTYTRANSACTIONBODY = 15,
    SENDMONEYTRANSACTIONBODY = 16,
    NODEREGISTRATIONTRANSACTIONBODY = 17,
  }
}

export class EmptyTransactionBody extends jspb.Message {
  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): EmptyTransactionBody.AsObject;
  static toObject(includeInstance: boolean, msg: EmptyTransactionBody): EmptyTransactionBody.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: EmptyTransactionBody, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): EmptyTransactionBody;
  static deserializeBinaryFromReader(message: EmptyTransactionBody, reader: jspb.BinaryReader): EmptyTransactionBody;
}

export namespace EmptyTransactionBody {
  export type AsObject = {
  }
}

export class SendMoneyTransactionBody extends jspb.Message {
  getAmount(): number;
  setAmount(value: number): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): SendMoneyTransactionBody.AsObject;
  static toObject(includeInstance: boolean, msg: SendMoneyTransactionBody): SendMoneyTransactionBody.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: SendMoneyTransactionBody, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): SendMoneyTransactionBody;
  static deserializeBinaryFromReader(message: SendMoneyTransactionBody, reader: jspb.BinaryReader): SendMoneyTransactionBody;
}

export namespace SendMoneyTransactionBody {
  export type AsObject = {
    amount: number,
  }
}

export class NodeRegistrationTransactionBody extends jspb.Message {
  getNodepublickey(): Uint8Array | string;
  getNodepublickey_asU8(): Uint8Array;
  getNodepublickey_asB64(): string;
  setNodepublickey(value: Uint8Array | string): void;

  getAccounttype(): number;
  setAccounttype(value: number): void;

  getAccountaddress(): string;
  setAccountaddress(value: string): void;

  getRegistrationheight(): number;
  setRegistrationheight(value: number): void;

  getNodeaddress(): string;
  setNodeaddress(value: string): void;

  getLockedbalance(): number;
  setLockedbalance(value: number): void;

  hasPoown(): boolean;
  clearPoown(): void;
  getPoown(): ProofOfOwnership | undefined;
  setPoown(value?: ProofOfOwnership): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): NodeRegistrationTransactionBody.AsObject;
  static toObject(includeInstance: boolean, msg: NodeRegistrationTransactionBody): NodeRegistrationTransactionBody.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: NodeRegistrationTransactionBody, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): NodeRegistrationTransactionBody;
  static deserializeBinaryFromReader(message: NodeRegistrationTransactionBody, reader: jspb.BinaryReader): NodeRegistrationTransactionBody;
}

export namespace NodeRegistrationTransactionBody {
  export type AsObject = {
    nodepublickey: Uint8Array | string,
    accounttype: number,
    accountaddress: string,
    registrationheight: number,
    nodeaddress: string,
    lockedbalance: number,
    poown?: ProofOfOwnership.AsObject,
  }
}

export class ProofOfOwnership extends jspb.Message {
  getAccounttype(): number;
  setAccounttype(value: number): void;

  getAccountaddress(): string;
  setAccountaddress(value: string): void;

  getBlockhash(): Uint8Array | string;
  getBlockhash_asU8(): Uint8Array;
  getBlockhash_asB64(): string;
  setBlockhash(value: Uint8Array | string): void;

  getBlockheight(): number;
  setBlockheight(value: number): void;

  getSignature(): Uint8Array | string;
  getSignature_asU8(): Uint8Array;
  getSignature_asB64(): string;
  setSignature(value: Uint8Array | string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): ProofOfOwnership.AsObject;
  static toObject(includeInstance: boolean, msg: ProofOfOwnership): ProofOfOwnership.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: ProofOfOwnership, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): ProofOfOwnership;
  static deserializeBinaryFromReader(message: ProofOfOwnership, reader: jspb.BinaryReader): ProofOfOwnership;
}

export namespace ProofOfOwnership {
  export type AsObject = {
    accounttype: number,
    accountaddress: string,
    blockhash: Uint8Array | string,
    blockheight: number,
    signature: Uint8Array | string,
  }
}

export class GetTransactionRequest extends jspb.Message {
  getId(): string;
  setId(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): GetTransactionRequest.AsObject;
  static toObject(includeInstance: boolean, msg: GetTransactionRequest): GetTransactionRequest.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: GetTransactionRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): GetTransactionRequest;
  static deserializeBinaryFromReader(message: GetTransactionRequest, reader: jspb.BinaryReader): GetTransactionRequest;
}

export namespace GetTransactionRequest {
  export type AsObject = {
    id: string,
  }
}

export class GetTransactionsRequest extends jspb.Message {
  getLimit(): number;
  setLimit(value: number): void;

  getOffset(): number;
  setOffset(value: number): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): GetTransactionsRequest.AsObject;
  static toObject(includeInstance: boolean, msg: GetTransactionsRequest): GetTransactionsRequest.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: GetTransactionsRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): GetTransactionsRequest;
  static deserializeBinaryFromReader(message: GetTransactionsRequest, reader: jspb.BinaryReader): GetTransactionsRequest;
}

export namespace GetTransactionsRequest {
  export type AsObject = {
    limit: number,
    offset: number,
  }
}

export class PostTransactionRequest extends jspb.Message {
  getTransactionbytes(): Uint8Array | string;
  getTransactionbytes_asU8(): Uint8Array;
  getTransactionbytes_asB64(): string;
  setTransactionbytes(value: Uint8Array | string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): PostTransactionRequest.AsObject;
  static toObject(includeInstance: boolean, msg: PostTransactionRequest): PostTransactionRequest.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: PostTransactionRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): PostTransactionRequest;
  static deserializeBinaryFromReader(message: PostTransactionRequest, reader: jspb.BinaryReader): PostTransactionRequest;
}

export namespace PostTransactionRequest {
  export type AsObject = {
    transactionbytes: Uint8Array | string,
  }
}

export class PostTransactionResponse extends jspb.Message {
  hasTransaction(): boolean;
  clearTransaction(): void;
  getTransaction(): Transaction | undefined;
  setTransaction(value?: Transaction): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): PostTransactionResponse.AsObject;
  static toObject(includeInstance: boolean, msg: PostTransactionResponse): PostTransactionResponse.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: PostTransactionResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): PostTransactionResponse;
  static deserializeBinaryFromReader(message: PostTransactionResponse, reader: jspb.BinaryReader): PostTransactionResponse;
}

export namespace PostTransactionResponse {
  export type AsObject = {
    transaction?: Transaction.AsObject,
  }
}

export class GetTransactionsResponse extends jspb.Message {
  getTotal(): number;
  setTotal(value: number): void;

  getCount(): number;
  setCount(value: number): void;

  clearTransactionsList(): void;
  getTransactionsList(): Array<Transaction>;
  setTransactionsList(value: Array<Transaction>): void;
  addTransactions(value?: Transaction, index?: number): Transaction;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): GetTransactionsResponse.AsObject;
  static toObject(includeInstance: boolean, msg: GetTransactionsResponse): GetTransactionsResponse.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: GetTransactionsResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): GetTransactionsResponse;
  static deserializeBinaryFromReader(message: GetTransactionsResponse, reader: jspb.BinaryReader): GetTransactionsResponse;
}

export namespace GetTransactionsResponse {
  export type AsObject = {
    total: number,
    count: number,
    transactionsList: Array<Transaction.AsObject>,
  }
}

export class PostUnconfirmedTransactionRequest extends jspb.Message {
  hasTransaction(): boolean;
  clearTransaction(): void;
  getTransaction(): Transaction | undefined;
  setTransaction(value?: Transaction): void;

  getArrivaltimestamp(): number;
  setArrivaltimestamp(value: number): void;

  getFeeperbyte(): number;
  setFeeperbyte(value: number): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): PostUnconfirmedTransactionRequest.AsObject;
  static toObject(includeInstance: boolean, msg: PostUnconfirmedTransactionRequest): PostUnconfirmedTransactionRequest.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: PostUnconfirmedTransactionRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): PostUnconfirmedTransactionRequest;
  static deserializeBinaryFromReader(message: PostUnconfirmedTransactionRequest, reader: jspb.BinaryReader): PostUnconfirmedTransactionRequest;
}

export namespace PostUnconfirmedTransactionRequest {
  export type AsObject = {
    transaction?: Transaction.AsObject,
    arrivaltimestamp: number,
    feeperbyte: number,
  }
}

