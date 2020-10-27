/// <reference types="node" />
import { BIP32Interface } from 'bip32';
import { EscrowTransactionInterface } from './send-money';
import { Account } from '../interfaces';
export interface SetupDatasetInterface extends EscrowTransactionInterface {
    property: string;
    value: string;
    setterAccountAddress: Account;
    recipientAccountAddress: Account;
    fee: number;
}
export declare function setupDatasetBuilder(data: SetupDatasetInterface, seed?: BIP32Interface): Buffer;
export declare function readSetupAccountDatasetBytes(txBytes: Buffer): {
    propertyLength: number;
    property: string;
    valueLength: number;
    value: string;
};
