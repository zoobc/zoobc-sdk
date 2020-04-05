// package: model
// file: model/snapshot.proto

import * as jspb from "google-protobuf";
import * as model_spineBlockManifest_pb from "../model/spineBlockManifest_pb";
import * as model_accountBalance_pb from "../model/accountBalance_pb";
import * as model_nodeRegistration_pb from "../model/nodeRegistration_pb";
import * as model_accountDatasets_pb from "../model/accountDatasets_pb";
import * as model_participationScore_pb from "../model/participationScore_pb";
import * as model_publishedReceipt_pb from "../model/publishedReceipt_pb";
import * as model_escrow_pb from "../model/escrow_pb";

export class SnapshotFileInfo extends jspb.Message {
  getSnapshotfilehash(): Uint8Array | string;
  getSnapshotfilehash_asU8(): Uint8Array;
  getSnapshotfilehash_asB64(): string;
  setSnapshotfilehash(value: Uint8Array | string): void;

  getHeight(): number;
  setHeight(value: number): void;

  getProcessexpirationtimestamp(): number;
  setProcessexpirationtimestamp(value: number): void;

  getChaintype(): number;
  setChaintype(value: number): void;

  getSpineblockmanifesttype(): model_spineBlockManifest_pb.SpineBlockManifestTypeMap[keyof model_spineBlockManifest_pb.SpineBlockManifestTypeMap];
  setSpineblockmanifesttype(value: model_spineBlockManifest_pb.SpineBlockManifestTypeMap[keyof model_spineBlockManifest_pb.SpineBlockManifestTypeMap]): void;

  clearFilechunkshashesList(): void;
  getFilechunkshashesList(): Array<Uint8Array | string>;
  getFilechunkshashesList_asU8(): Array<Uint8Array>;
  getFilechunkshashesList_asB64(): Array<string>;
  setFilechunkshashesList(value: Array<Uint8Array | string>): void;
  addFilechunkshashes(value: Uint8Array | string, index?: number): Uint8Array | string;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): SnapshotFileInfo.AsObject;
  static toObject(includeInstance: boolean, msg: SnapshotFileInfo): SnapshotFileInfo.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: SnapshotFileInfo, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): SnapshotFileInfo;
  static deserializeBinaryFromReader(message: SnapshotFileInfo, reader: jspb.BinaryReader): SnapshotFileInfo;
}

export namespace SnapshotFileInfo {
  export type AsObject = {
    snapshotfilehash: Uint8Array | string,
    height: number,
    processexpirationtimestamp: number,
    chaintype: number,
    spineblockmanifesttype: model_spineBlockManifest_pb.SpineBlockManifestTypeMap[keyof model_spineBlockManifest_pb.SpineBlockManifestTypeMap],
    filechunkshashesList: Array<Uint8Array | string>,
  }
}

export class SnapshotPayload extends jspb.Message {
  clearAccountbalancesList(): void;
  getAccountbalancesList(): Array<model_accountBalance_pb.AccountBalance>;
  setAccountbalancesList(value: Array<model_accountBalance_pb.AccountBalance>): void;
  addAccountbalances(value?: model_accountBalance_pb.AccountBalance, index?: number): model_accountBalance_pb.AccountBalance;

  clearNoderegistrationsList(): void;
  getNoderegistrationsList(): Array<model_nodeRegistration_pb.NodeRegistration>;
  setNoderegistrationsList(value: Array<model_nodeRegistration_pb.NodeRegistration>): void;
  addNoderegistrations(value?: model_nodeRegistration_pb.NodeRegistration, index?: number): model_nodeRegistration_pb.NodeRegistration;

  clearAccountdatasetsList(): void;
  getAccountdatasetsList(): Array<model_accountDatasets_pb.AccountDataset>;
  setAccountdatasetsList(value: Array<model_accountDatasets_pb.AccountDataset>): void;
  addAccountdatasets(value?: model_accountDatasets_pb.AccountDataset, index?: number): model_accountDatasets_pb.AccountDataset;

  clearParticipationscoresList(): void;
  getParticipationscoresList(): Array<model_participationScore_pb.ParticipationScore>;
  setParticipationscoresList(value: Array<model_participationScore_pb.ParticipationScore>): void;
  addParticipationscores(value?: model_participationScore_pb.ParticipationScore, index?: number): model_participationScore_pb.ParticipationScore;

  clearPublishedreceiptsList(): void;
  getPublishedreceiptsList(): Array<model_publishedReceipt_pb.PublishedReceipt>;
  setPublishedreceiptsList(value: Array<model_publishedReceipt_pb.PublishedReceipt>): void;
  addPublishedreceipts(value?: model_publishedReceipt_pb.PublishedReceipt, index?: number): model_publishedReceipt_pb.PublishedReceipt;

  clearEscrowtransactionsList(): void;
  getEscrowtransactionsList(): Array<model_escrow_pb.Escrow>;
  setEscrowtransactionsList(value: Array<model_escrow_pb.Escrow>): void;
  addEscrowtransactions(value?: model_escrow_pb.Escrow, index?: number): model_escrow_pb.Escrow;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): SnapshotPayload.AsObject;
  static toObject(includeInstance: boolean, msg: SnapshotPayload): SnapshotPayload.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: SnapshotPayload, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): SnapshotPayload;
  static deserializeBinaryFromReader(message: SnapshotPayload, reader: jspb.BinaryReader): SnapshotPayload;
}

export namespace SnapshotPayload {
  export type AsObject = {
    accountbalancesList: Array<model_accountBalance_pb.AccountBalance.AsObject>,
    noderegistrationsList: Array<model_nodeRegistration_pb.NodeRegistration.AsObject>,
    accountdatasetsList: Array<model_accountDatasets_pb.AccountDataset.AsObject>,
    participationscoresList: Array<model_participationScore_pb.ParticipationScore.AsObject>,
    publishedreceiptsList: Array<model_publishedReceipt_pb.PublishedReceipt.AsObject>,
    escrowtransactionsList: Array<model_escrow_pb.Escrow.AsObject>,
  }
}

