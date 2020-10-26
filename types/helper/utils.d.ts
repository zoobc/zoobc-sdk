/// <reference types="node" />
import { Account } from './interfaces';
export declare const errorDateMessage: {
    code: string;
    message: string;
    metadata: string;
};
export declare function getZBCAddress(publicKey: Uint8Array, prefix?: string): string;
export declare function hash(str: any, format?: any): string | Buffer;
export declare function encryptPassword(password: string, salt?: string): string;
export declare function isZBCAddressValid(address: string): boolean;
export declare function ZBCAddressToBytes(address: string): Buffer;
export declare function shortenHash(text?: string): string;
export declare function writeInt64(number: number | string, base?: number, endian?: any): Buffer;
export declare function readInt64(buff: Buffer, offset: number): string;
export declare function writeInt32(number: number): Buffer;
export declare function validationTimestamp(txBytes: Buffer): Promise<boolean>;
export declare function parseAccountAddress(account: string | Uint8Array): Account;
export declare function accountToBytes(account: Account): Buffer;
