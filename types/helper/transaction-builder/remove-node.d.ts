/// <reference types="node" />
import { BIP32Interface } from 'bip32';
export interface RemoveNodeInterface {
    accountAddress: string;
    fee: number;
    nodePublicKey: string;
}
export declare function removeNodeBuilder(data: RemoveNodeInterface, seed: BIP32Interface): Buffer;
