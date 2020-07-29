/// <reference types="node" />
import { BIP32Interface } from 'bip32';
export interface RemoveNodeInterface {
    accountAddress: string;
    fee: number;
    nodePublicKey: Buffer;
}
export declare function removeNodeBuilder(data: RemoveNodeInterface, seed: BIP32Interface): Buffer;
