// package: model
// file: model/liquidPayment.proto

import * as jspb from "google-protobuf";

export class LiquidPayment extends jspb.Message {
  getId(): string;
  setId(value: string): void;

  getSenderaddress(): Uint8Array | string;
  getSenderaddress_asU8(): Uint8Array;
  getSenderaddress_asB64(): string;
  setSenderaddress(value: Uint8Array | string): void;

  getRecipientaddress(): Uint8Array | string;
  getRecipientaddress_asU8(): Uint8Array;
  getRecipientaddress_asB64(): string;
  setRecipientaddress(value: Uint8Array | string): void;

  getAmount(): string;
  setAmount(value: string): void;

  getAppliedtime(): string;
  setAppliedtime(value: string): void;

  getCompleteminutes(): string;
  setCompleteminutes(value: string): void;

  getStatus(): LiquidPaymentStatusMap[keyof LiquidPaymentStatusMap];
  setStatus(value: LiquidPaymentStatusMap[keyof LiquidPaymentStatusMap]): void;

  getBlockheight(): number;
  setBlockheight(value: number): void;

  getLatest(): boolean;
  setLatest(value: boolean): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): LiquidPayment.AsObject;
  static toObject(includeInstance: boolean, msg: LiquidPayment): LiquidPayment.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: LiquidPayment, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): LiquidPayment;
  static deserializeBinaryFromReader(message: LiquidPayment, reader: jspb.BinaryReader): LiquidPayment;
}

export namespace LiquidPayment {
  export type AsObject = {
    id: string,
    senderaddress: Uint8Array | string,
    recipientaddress: Uint8Array | string,
    amount: string,
    appliedtime: string,
    completeminutes: string,
    status: LiquidPaymentStatusMap[keyof LiquidPaymentStatusMap],
    blockheight: number,
    latest: boolean,
  }
}

export interface LiquidPaymentStatusMap {
  LIQUIDPAYMENTPENDING: 0;
  LIQUIDPAYMENTCOMPLETED: 1;
}

export const LiquidPaymentStatus: LiquidPaymentStatusMap;

