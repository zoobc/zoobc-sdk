/// <reference types="node" />
import { BIP32Interface } from 'bip32';
export interface ClaimNodeInterface {
    accountAddress: string;
    fee: number;
    nodePublicKey: Buffer;
    nodeAddress: string;
}
<<<<<<< HEAD
export declare function claimNodeBuilder(data: ClaimNodeInterface, poown: Buffer, seed: BIP32Interface): Buffer;
export declare function readClaimNodeBytes(txBytes: Buffer, bytesConverted: any): any;
=======
export declare function claimNodeBuilder(data: ClaimNodeInterface, poown: Buffer, seed?: BIP32Interface): Buffer;
>>>>>>> 6eff0a072c6aab7254cc23bfbebd4450568e0914
