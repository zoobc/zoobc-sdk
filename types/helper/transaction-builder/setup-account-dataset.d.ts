/// <reference types="node" />
import { BIP32Interface } from 'bip32';
export interface SetupDatasetInterface {
    property: string;
    value: string;
    setterAccountAddress: string;
    recipientAccountAddress: string;
    fee: number;
}
<<<<<<< HEAD
export declare function setupDatasetBuilder(data: SetupDatasetInterface, seed: BIP32Interface): Buffer;
export declare function readSetupAccountDatasetBytes(txBytes: Buffer, bytesConverted: any): any;
=======
export declare function setupDatasetBuilder(data: SetupDatasetInterface, seed?: BIP32Interface): Buffer;
>>>>>>> 6eff0a072c6aab7254cc23bfbebd4450568e0914
