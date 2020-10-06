/// <reference types="node" />
import { BIP32Interface } from 'bip32';
export interface UpdateNodeInterface {
    accountAddress: string;
    fee: number;
    nodePublicKey: Buffer;
    nodeAddress: string;
    funds: number;
}
<<<<<<< HEAD
export declare function updateNodeBuilder(data: UpdateNodeInterface, poown: Buffer, seed: BIP32Interface): Buffer;
export declare function readUpdateNodeBytes(txBytes: Buffer, bytesConverted: any): any;
=======
export declare function updateNodeBuilder(data: UpdateNodeInterface, poown: Buffer, seed?: BIP32Interface): Buffer;
>>>>>>> 6eff0a072c6aab7254cc23bfbebd4450568e0914
