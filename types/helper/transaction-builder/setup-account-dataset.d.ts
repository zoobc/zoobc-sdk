/// <reference types="node" />
import { BIP32Interface } from 'bip32';
import { Account } from '../interfaces';
export interface SetupDatasetInterface {
    property: string;
    value: string;
    setter: Account;
    recipient: Account;
    fee: number;
}
export declare function setupDatasetBuilder(data: SetupDatasetInterface, seed?: BIP32Interface): Buffer;
export declare function readSetupAccountDatasetBytes(txBytes: Buffer): {
    propertyLength: number;
    property: string;
    valueLength: number;
    value: string;
};
