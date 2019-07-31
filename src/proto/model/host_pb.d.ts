// package: model
// file: model/host.proto

import * as jspb from "google-protobuf";
import * as model_node_pb from "../model/node_pb";
import * as model_peer_pb from "../model/peer_pb";

export class Host extends jspb.Message {
  hasInfo(): boolean;
  clearInfo(): void;
  getInfo(): model_node_pb.Node | undefined;
  setInfo(value?: model_node_pb.Node): void;

  getResolvedpeersMap(): jspb.Map<string, model_peer_pb.Peer>;
  clearResolvedpeersMap(): void;
  getUnresolvedpeersMap(): jspb.Map<string, model_peer_pb.Peer>;
  clearUnresolvedpeersMap(): void;
  getKnownpeersMap(): jspb.Map<string, model_peer_pb.Peer>;
  clearKnownpeersMap(): void;
  getBlacklistedpeersMap(): jspb.Map<string, model_peer_pb.Peer>;
  clearBlacklistedpeersMap(): void;
  getStopped(): boolean;
  setStopped(value: boolean): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): Host.AsObject;
  static toObject(includeInstance: boolean, msg: Host): Host.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: Host, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): Host;
  static deserializeBinaryFromReader(message: Host, reader: jspb.BinaryReader): Host;
}

export namespace Host {
  export type AsObject = {
    info?: model_node_pb.Node.AsObject,
    resolvedpeersMap: Array<[string, model_peer_pb.Peer.AsObject]>,
    unresolvedpeersMap: Array<[string, model_peer_pb.Peer.AsObject]>,
    knownpeersMap: Array<[string, model_peer_pb.Peer.AsObject]>,
    blacklistedpeersMap: Array<[string, model_peer_pb.Peer.AsObject]>,
    stopped: boolean,
  }
}

