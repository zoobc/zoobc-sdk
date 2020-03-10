/// <reference types="node" />
import { BIP32Interface } from 'bip32';
export interface RegisterNodeInterface {
    accountAddress: string;
    fee: number;
    nodePublicKey: string;
    nodeAddress: string;
    funds: number;
    poown: Buffer;
}
export declare function registerNodeBuilder(data: RegisterNodeInterface, seed: BIP32Interface): Buffer;
