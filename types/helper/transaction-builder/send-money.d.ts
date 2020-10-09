/// <reference types="node" />
import { BIP32Interface } from 'bip32';
import { ZBCTransaction } from '../wallet/Transaction';
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
export declare function readPostTransactionBytes(txBytes: Buffer): ZBCTransaction;
export declare function readSendMoneyBytes(txBytes: Buffer): {
    amount: string;
};
