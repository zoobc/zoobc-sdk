/// <reference types="node" />
import { BIP32Interface } from 'bip32';
import { EscrowTransactionInterface } from './send-money';
import { Account } from '../interfaces';
export interface ClaimNodeInterface extends EscrowTransactionInterface {
    accountAddress: Account;
    fee: number;
    nodePublicKey: Buffer;
    nodeAddress: string;
}
export declare function claimNodeBuilder(data: ClaimNodeInterface, poown: Buffer, seed?: BIP32Interface): Buffer;
export declare function readClaimNodeBytes(txBytes: Buffer): {
    nodepublickey: string;
    poown: Buffer;
};
