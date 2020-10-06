/// <reference types="node" />
import { BIP32Interface } from 'bip32';
export interface RemoveNodeInterface {
    accountAddress: string;
    fee: number;
    nodePublicKey: Buffer;
}
<<<<<<< HEAD
export declare function removeNodeBuilder(data: RemoveNodeInterface, seed: BIP32Interface): Buffer;
export declare function readRemoveNodeRegistrationBytes(txBytes: Buffer, bytesConverted: any): any;
=======
export declare function removeNodeBuilder(data: RemoveNodeInterface, seed?: BIP32Interface): Buffer;
>>>>>>> 6eff0a072c6aab7254cc23bfbebd4450568e0914
