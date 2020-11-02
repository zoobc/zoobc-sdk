/// <reference types="node" />
import { BIP32Interface } from 'bip32';
import { EscrowTransactionInterface } from './send-money';
import { Address } from '../interfaces';
export interface UpdateNodeInterface extends EscrowTransactionInterface {
    accountAddress: Address;
    fee: number;
    nodePublicKey: Buffer;
    nodeAddress: string;
    funds: number;
}
export declare function updateNodeBuilder(data: UpdateNodeInterface, poown: Buffer, seed?: BIP32Interface): Buffer;
export declare function readUpdateNodeBytes(txBytes: Buffer, offset: number): {
    nodepublickey: string;
    lockedbalance: number;
    poown: Buffer;
};
