/// <reference types="node" />
import { BIP32Interface } from 'bip32';
import { EscrowTransactionInterface } from './send-money';
import { Address } from '../interfaces';
export interface SetupDatasetInterface extends EscrowTransactionInterface {
    property: string;
    value: string;
    setterAccountAddress: Address;
    recipientAccountAddress: Address;
    fee: number;
}
export declare function setupDatasetBuilder(data: SetupDatasetInterface, seed?: BIP32Interface): Buffer;
export declare function readSetupDatasetBytes(txBytes: Buffer, offset: number): {
    property: string;
    value: string;
};
