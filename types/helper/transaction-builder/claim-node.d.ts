/// <reference types="node" />
import { BIP32Interface } from 'bip32';
export interface ClaimNodeInterface {
    accountAddress: string;
    fee: number;
    nodePublicKey: string;
    poown: Buffer;
}
export declare function claimNodeBuilder(data: ClaimNodeInterface, seed: BIP32Interface): Buffer;
