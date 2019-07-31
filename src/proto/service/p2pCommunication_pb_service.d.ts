// package: service
// file: service/p2pCommunication.proto

import * as service_p2pCommunication_pb from "../service/p2pCommunication_pb";
import * as model_peer_pb from "../model/peer_pb";
import * as model_node_pb from "../model/node_pb";
import * as model_empty_pb from "../model/empty_pb";
import {grpc} from "@improbable-eng/grpc-web";

type P2PCommunicationGetPeerInfo = {
  readonly methodName: string;
  readonly service: typeof P2PCommunication;
  readonly requestStream: false;
  readonly responseStream: false;
  readonly requestType: typeof model_peer_pb.GetPeerInfoRequest;
  readonly responseType: typeof model_node_pb.Node;
};

type P2PCommunicationGetMorePeers = {
  readonly methodName: string;
  readonly service: typeof P2PCommunication;
  readonly requestStream: false;
  readonly responseStream: false;
  readonly requestType: typeof model_empty_pb.Empty;
  readonly responseType: typeof model_peer_pb.GetMorePeersResponse;
};

type P2PCommunicationSendPeers = {
  readonly methodName: string;
  readonly service: typeof P2PCommunication;
  readonly requestStream: false;
  readonly responseStream: false;
  readonly requestType: typeof model_peer_pb.SendPeersRequest;
  readonly responseType: typeof model_empty_pb.Empty;
};

export class P2PCommunication {
  static readonly serviceName: string;
  static readonly GetPeerInfo: P2PCommunicationGetPeerInfo;
  static readonly GetMorePeers: P2PCommunicationGetMorePeers;
  static readonly SendPeers: P2PCommunicationSendPeers;
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

export class P2PCommunicationClient {
  readonly serviceHost: string;

  constructor(serviceHost: string, options?: grpc.RpcOptions);
  getPeerInfo(
    requestMessage: model_peer_pb.GetPeerInfoRequest,
    metadata: grpc.Metadata,
    callback: (error: ServiceError|null, responseMessage: model_node_pb.Node|null) => void
  ): UnaryResponse;
  getPeerInfo(
    requestMessage: model_peer_pb.GetPeerInfoRequest,
    callback: (error: ServiceError|null, responseMessage: model_node_pb.Node|null) => void
  ): UnaryResponse;
  getMorePeers(
    requestMessage: model_empty_pb.Empty,
    metadata: grpc.Metadata,
    callback: (error: ServiceError|null, responseMessage: model_peer_pb.GetMorePeersResponse|null) => void
  ): UnaryResponse;
  getMorePeers(
    requestMessage: model_empty_pb.Empty,
    callback: (error: ServiceError|null, responseMessage: model_peer_pb.GetMorePeersResponse|null) => void
  ): UnaryResponse;
  sendPeers(
    requestMessage: model_peer_pb.SendPeersRequest,
    metadata: grpc.Metadata,
    callback: (error: ServiceError|null, responseMessage: model_empty_pb.Empty|null) => void
  ): UnaryResponse;
  sendPeers(
    requestMessage: model_peer_pb.SendPeersRequest,
    callback: (error: ServiceError|null, responseMessage: model_empty_pb.Empty|null) => void
  ): UnaryResponse;
}

