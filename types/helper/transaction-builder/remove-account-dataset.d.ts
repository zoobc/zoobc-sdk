/// <reference types="node" />
import { BIP32Interface } from 'bip32';
export interface RemoveDatasetInterface {
    property: string;
    value: string;
    setterAccountAddress: string;
    recipientAccountAddress: string;
    fee: number;
}
export declare function removeDatasetBuilder(data: RemoveDatasetInterface, seed: BIP32Interface): Buffer;
