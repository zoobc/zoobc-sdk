/// <reference types="node" />
import { BIP32Interface } from 'bip32';
import { Account } from '../interfaces';
import { EscrowTransactionInterface } from './send-money';
export interface MultiSigInterface extends EscrowTransactionInterface {
    accountAddress: Account;
    fee: number;
    multisigInfo?: MultiSigInfo;
    unisgnedTransactions?: Buffer;
    signaturesInfo?: SignatureInfo;
}
export interface MultiSigInfo {
    participants: Account[];
    nonce: number;
    minSigs: number;
}
export interface SignatureInfo {
    txHash: string;
    participants: {
        address: Account;
        signature: Buffer;
    }[];
}
export declare function multisignatureBuilder(data: MultiSigInterface, seed?: BIP32Interface): Buffer;
export declare function signTransactionHash(txHash: string, seed: BIP32Interface): Buffer;
