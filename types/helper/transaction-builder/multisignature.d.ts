/// <reference types="node" />
import { BIP32Interface } from 'bip32';
import { Address } from '../interfaces';
import { EscrowTransactionInterface } from './send-money';
export interface MultiSigInterface extends EscrowTransactionInterface {
    accountAddress: Address;
    fee: number;
    multisigInfo?: MultiSigInfo;
    unisgnedTransactions?: Buffer;
    signaturesInfo?: SignatureInfo;
}
export interface MultiSigInfo {
    participants: Address[];
    nonce: number;
    minSigs: number;
}
export interface SignatureInfo {
    txHash: string;
    participants: {
        address: Address;
        signature: Buffer;
    }[];
}
export declare function multisignatureBuilder(data: MultiSigInterface, seed?: BIP32Interface): Buffer;
export declare function signTransactionHash(txHash: string, seed: BIP32Interface): Buffer;
