/// <reference types="node" />
import { BIP32Interface } from 'bip32';
import { Account } from '../interfaces';
export interface RemoveNodeInterface {
    accountAddress: Account;
    fee: number;
    nodePublicKey: Buffer;
}
export declare function removeNodeBuilder(data: RemoveNodeInterface, seed?: BIP32Interface): Buffer;
export declare function readRemoveNodeRegistrationBytes(txBytes: Buffer): {
    nodepublickey: string;
};
