/// <reference types="node" />
import { SendMoneyInterface } from './send-money';
import { BIP32Interface } from 'bip32';
export interface MultiSigInterface {
    accountAddress: string;
    fee: number;
    multisigInfo?: MultiSigInfo;
    unisgnedTransactions?: SendMoneyInterface;
    signaturesInfo?: SignatureInfo;
}
export interface MultiSigAddress {
    participants: string[];
    nonce: number;
    minSigs: number;
}
export interface MultiSigInfo {
    participants: string[];
    nonce: number;
    minSigs: number;
    multisigAddress: string;
}
export interface SignatureInfo {
    txHash: string;
    participants: {
        address: string;
        signature: Buffer;
    }[];
}
export declare function multisignatureBuilder(data: MultiSigInterface, seed: BIP32Interface): Buffer;
export declare function signTransactionHash(txHash: string, seed: BIP32Interface): Buffer;
