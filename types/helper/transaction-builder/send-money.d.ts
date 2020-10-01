/// <reference types="node" />
import { BIP32Interface } from 'bip32';
export interface SendMoneyInterface {
    sender: string;
    recipient: string;
    fee: number;
    amount: number;
    approverAddress?: string;
    commission?: number;
    timeout?: number;
    instruction?: string;
}
export declare function sendMoneyBuilder(data: SendMoneyInterface, seed?: BIP32Interface): Buffer;
export declare function readPostTransactionBytes(txBytes: Buffer): {
    timestamp: string;
    senderAddress: string;
    recipientAddress: string;
    txFee: string;
    bodyBytes: string;
    approverAddress: string;
    commission: string;
    timeout: string;
    instruction: string;
    multisigTxType: string;
};
export declare function readSendMoneyBytes(txBytes: Buffer, bytesConverted: any): any;
export declare function readSendMoneyEscrowBytes(txBytes: Buffer, bytesConverted: any): any;
