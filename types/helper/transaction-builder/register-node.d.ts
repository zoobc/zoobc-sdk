/// <reference types="node" />
import { BIP32Interface } from 'bip32';
import { EscrowTransactionInterface } from './send-money';
import { Account } from '../interfaces';
export interface RegisterNodeInterface extends EscrowTransactionInterface {
    accountAddress: Account;
    fee: number;
    nodePublicKey: Buffer;
    nodeAddress: string;
    funds: number;
}
export declare function registerNodeBuilder(data: RegisterNodeInterface, poown: Buffer, seed?: BIP32Interface): Buffer;
export declare function readNodeRegistrationBytes(txBytes: Buffer): {
    nodepublickey: string;
    accountaddress: Account;
    lockedbalance: string;
};
