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
export declare function sendMoneyBuilder(data: SendMoneyInterface, seed: BIP32Interface): Buffer;
