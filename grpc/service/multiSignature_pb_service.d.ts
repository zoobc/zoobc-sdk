// package: service
// file: service/multiSignature.proto

import * as service_multiSignature_pb from "../service/multiSignature_pb";
import * as model_multiSignature_pb from "../model/multiSignature_pb";
import {grpc} from "@improbable-eng/grpc-web";

type MultisigServiceGetPendingTransactionByAddress = {
  readonly methodName: string;
  readonly service: typeof MultisigService;
  readonly requestStream: false;
  readonly responseStream: false;
  readonly requestType: typeof model_multiSignature_pb.GetPendingTransactionByAddressRequest;
  readonly responseType: typeof model_multiSignature_pb.GetPendingTransactionByAddressResponse;
};

type MultisigServiceGetPendingTransactionDetailByTransactionHash = {
  readonly methodName: string;
  readonly service: typeof MultisigService;
  readonly requestStream: false;
  readonly responseStream: false;
  readonly requestType: typeof model_multiSignature_pb.GetPendingTransactionDetailByTransactionHashRequest;
  readonly responseType: typeof model_multiSignature_pb.GetPendingTransactionDetailByTransactionHashResponse;
};

export class MultisigService {
  static readonly serviceName: string;
  static readonly GetPendingTransactionByAddress: MultisigServiceGetPendingTransactionByAddress;
  static readonly GetPendingTransactionDetailByTransactionHash: MultisigServiceGetPendingTransactionDetailByTransactionHash;
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

export class MultisigServiceClient {
  readonly serviceHost: string;

  constructor(serviceHost: string, options?: grpc.RpcOptions);
  getPendingTransactionByAddress(
    requestMessage: model_multiSignature_pb.GetPendingTransactionByAddressRequest,
    metadata: grpc.Metadata,
    callback: (error: ServiceError|null, responseMessage: model_multiSignature_pb.GetPendingTransactionByAddressResponse|null) => void
  ): UnaryResponse;
  getPendingTransactionByAddress(
    requestMessage: model_multiSignature_pb.GetPendingTransactionByAddressRequest,
    callback: (error: ServiceError|null, responseMessage: model_multiSignature_pb.GetPendingTransactionByAddressResponse|null) => void
  ): UnaryResponse;
  getPendingTransactionDetailByTransactionHash(
    requestMessage: model_multiSignature_pb.GetPendingTransactionDetailByTransactionHashRequest,
    metadata: grpc.Metadata,
    callback: (error: ServiceError|null, responseMessage: model_multiSignature_pb.GetPendingTransactionDetailByTransactionHashResponse|null) => void
  ): UnaryResponse;
  getPendingTransactionDetailByTransactionHash(
    requestMessage: model_multiSignature_pb.GetPendingTransactionDetailByTransactionHashRequest,
    callback: (error: ServiceError|null, responseMessage: model_multiSignature_pb.GetPendingTransactionDetailByTransactionHashResponse|null) => void
  ): UnaryResponse;
}

