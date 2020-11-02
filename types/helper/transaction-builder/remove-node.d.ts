/// <reference types="node" />
import { BIP32Interface } from 'bip32';
import { EscrowTransactionInterface } from './send-money';
import { Address } from '../interfaces';
export interface RemoveNodeInterface extends EscrowTransactionInterface {
    accountAddress: Address;
    fee: number;
    nodePublicKey: Buffer;
}
export declare function removeNodeBuilder(data: RemoveNodeInterface, seed?: BIP32Interface): Buffer;
export declare function readRemoveNodeBytes(txBytes: Buffer, offset: number): {
    nodepublickey: string;
};
