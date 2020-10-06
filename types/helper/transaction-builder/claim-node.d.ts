/// <reference types="node" />
import { BIP32Interface } from 'bip32';
export interface ClaimNodeInterface {
    accountAddress: string;
    fee: number;
    nodePublicKey: Buffer;
    nodeAddress: string;
}
export declare function claimNodeBuilder(data: ClaimNodeInterface, poown: Buffer, seed?: BIP32Interface): Buffer;
