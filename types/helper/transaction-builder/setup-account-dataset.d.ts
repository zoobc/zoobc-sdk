/// <reference types="node" />
import { BIP32Interface } from 'bip32';
export interface SetupDatasetInterface {
    property: string;
    value: string;
    setterAccountAddress: string;
    recipientAccountAddress: string;
    fee: number;
}
export declare function setupDatasetBuilder(data: SetupDatasetInterface, seed?: BIP32Interface): Buffer;
export declare function readSetupAccountDatasetBytes(txBytes: Buffer, bytesConverted: any): any;
