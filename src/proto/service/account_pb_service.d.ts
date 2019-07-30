// package: service
// file: service/account.proto

import * as service_account_pb from "../service/account_pb";
import * as model_account_pb from "../model/account_pb";
import {grpc} from "@improbable-eng/grpc-web";

type AccountServiceGetAccounts = {
  readonly methodName: string;
  readonly service: typeof AccountService;
  readonly requestStream: false;
  readonly responseStream: false;
  readonly requestType: typeof model_account_pb.GetAccountsRequest;
  readonly responseType: typeof model_account_pb.GetAccountsResponse;
};

type AccountServiceGetAccount = {
  readonly methodName: string;
  readonly service: typeof AccountService;
  readonly requestStream: false;
  readonly responseStream: false;
  readonly requestType: typeof model_account_pb.GetAccountRequest;
  readonly responseType: typeof model_account_pb.Account;
};

export class AccountService {
  static readonly serviceName: string;
  static readonly GetAccounts: AccountServiceGetAccounts;
  static readonly GetAccount: AccountServiceGetAccount;
}

export type ServiceError = { message: string, code: number; metadata: grpc.Metadata }
export type Status = { details: string, code: number; metadata: grpc.Metadata }

interface UnaryResponse {
  cancel(): void;
}
interface ResponseStream<T> {
  cancel(): void;
  on(type: 'data', handler: (message: T) => void): ResponseStream<T>;
  on(type: 'end', handler: (status?: Status) => void): ResponseStream<T>;
  on(type: 'status', handler: (status: Status) => void): ResponseStream<T>;
}
interface RequestStream<T> {
  write(message: T): RequestStream<T>;
  end(): void;
  cancel(): void;
  on(type: 'end', handler: (status?: Status) => void): RequestStream<T>;
  on(type: 'status', handler: (status: Status) => void): RequestStream<T>;
}
interface BidirectionalStream<ReqT, ResT> {
  write(message: ReqT): BidirectionalStream<ReqT, ResT>;
  end(): void;
  cancel(): void;
  on(type: 'data', handler: (message: ResT) => void): BidirectionalStream<ReqT, ResT>;
  on(type: 'end', handler: (status?: Status) => void): BidirectionalStream<ReqT, ResT>;
  on(type: 'status', handler: (status: Status) => void): BidirectionalStream<ReqT, ResT>;
}

export class AccountServiceClient {
  readonly serviceHost: string;

  constructor(serviceHost: string, options?: grpc.RpcOptions);
  getAccounts(
    requestMessage: model_account_pb.GetAccountsRequest,
    metadata: grpc.Metadata,
    callback: (error: ServiceError|null, responseMessage: model_account_pb.GetAccountsResponse|null) => void
  ): UnaryResponse;
  getAccounts(
    requestMessage: model_account_pb.GetAccountsRequest,
    callback: (error: ServiceError|null, responseMessage: model_account_pb.GetAccountsResponse|null) => void
  ): UnaryResponse;
  getAccount(
    requestMessage: model_account_pb.GetAccountRequest,
    metadata: grpc.Metadata,
    callback: (error: ServiceError|null, responseMessage: model_account_pb.Account|null) => void
  ): UnaryResponse;
  getAccount(
    requestMessage: model_account_pb.GetAccountRequest,
    callback: (error: ServiceError|null, responseMessage: model_account_pb.Account|null) => void
  ): UnaryResponse;
}

