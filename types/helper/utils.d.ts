/// <reference types="node" />
export declare function getZBCAdress(publicKey: Uint8Array): string;
export declare function encryptPassword(password: string, salt?: string): string;
export declare function ZBCAddressValidation(address: string): boolean;
export declare function isZBCPublicKeyValid(pubkey: string): boolean;
export declare function writeInt64(number: number | string, base?: number, endian?: any): Buffer;
export declare function readInt64(buff: Buffer, offset: number): number;
export declare function writeInt32(number: number): Buffer;
