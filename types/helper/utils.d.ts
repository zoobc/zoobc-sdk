/// <reference types="node" />
export declare function getZBCAdress(publicKey: Uint8Array, prefix?: string): string;
export declare function hash(str: any, format?: string): string | Buffer;
export declare function getChecksumByte(bytes: Uint8Array): Uint8Array;
export declare function encryptPassword(password: string, salt?: string): string;
export declare function isZBCAddressValid(address: string, stdPrefix?: string): boolean;
export declare function ZBCAddressToBytes(address: string): Buffer;
export declare function writeInt64(number: number | string, base?: number, endian?: any): Buffer;
export declare function readInt64(buff: Buffer, offset: number): number;
export declare function writeInt32(number: number): Buffer;
