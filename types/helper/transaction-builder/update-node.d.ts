/// <reference types="node" />
import { BIP32Interface } from 'bip32';
import { EscrowTransactionInterface } from './send-money';
import { Account } from '../interfaces';
export interface UpdateNodeInterface extends EscrowTransactionInterface {
    accountAddress: Account;
    fee: number;
    nodePublicKey: Buffer;
    nodeAddress: string;
    funds: number;
}
export declare function updateNodeBuilder(data: UpdateNodeInterface, poown: Buffer, seed?: BIP32Interface): Buffer;
export declare function readUpdateNodeBytes(txBytes: Buffer): {
    nodepublickey: string;
    lockedbalance: string;
    poown: Buffer;
};
