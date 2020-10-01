/// <reference types="node" />
import { BIP32Interface } from 'bip32';
export interface UpdateNodeInterface {
    accountAddress: string;
    fee: number;
    nodePublicKey: Buffer;
    nodeAddress: string;
    funds: number;
}
export declare function updateNodeBuilder(data: UpdateNodeInterface, poown: Buffer, seed?: BIP32Interface): Buffer;
