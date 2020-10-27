/// <reference types="node" />
import { BIP32Interface } from 'bip32';
import { ZBCTransaction } from '../wallet/Transaction';
import { Account } from '../interfaces';
export interface SendMoneyInterface extends EscrowTransactionInterface {
    sender: Account;
    recipient: Account;
    fee: number;
    amount: number;
}
export interface EscrowTransactionInterface {
    approverAddress?: Account;
    commission?: number;
    timeout?: number;
    instruction?: string;
}
export declare function sendMoneyBuilder(data: SendMoneyInterface, seed?: BIP32Interface): Buffer;
export declare function readPostTransactionBytes(txBytes: Buffer): ZBCTransaction;
export declare function readEscrowBytes(txBytes: Buffer, transaction: ZBCTransaction): ZBCTransaction;
export declare function readSendMoneyBytes(txBytes: Buffer): {
    amount: string;
};
