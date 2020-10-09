/// <reference types="node" />
import { BIP32Interface } from 'bip32';
export interface RegisterNodeInterface {
    accountAddress: string;
    fee: number;
    nodePublicKey: Buffer;
    nodeAddress: string;
    funds: number;
}
export declare function registerNodeBuilder(data: RegisterNodeInterface, poown: Buffer, seed?: BIP32Interface): Buffer;
export declare function readNodeRegistrationBytes(txBytes: Buffer): {
    pubkey: string;
    accountAddress: string;
    lockedBalance: string;
};
