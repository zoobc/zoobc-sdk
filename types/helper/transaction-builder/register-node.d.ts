/// <reference types="node" />
import { BIP32Interface } from 'bip32';
import { EscrowTransactionInterface } from './send-money';
import { Address } from '../interfaces';
export interface RegisterNodeInterface extends EscrowTransactionInterface {
    accountAddress: Address;
    fee: number;
    nodePublicKey: Buffer;
    nodeAddress: string;
    funds: number;
}
export declare function registerNodeBuilder(data: RegisterNodeInterface, poown: Buffer, seed?: BIP32Interface): Buffer;
export declare function readRegisterNodeBytes(txBytes: Buffer, offset: number): {
    nodepublickey: string;
    accountaddress: Address;
    lockedbalance: number;
};
