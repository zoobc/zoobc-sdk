/// <reference types="node" />
import { BIP32Interface } from 'bip32';
import { EscrowTransactionInterface } from './send-money';
import { Account } from '../interfaces';
export interface EscrowApprovalInterface extends EscrowTransactionInterface {
    approvalAddress: Account;
    fee: number;
    approvalCode: number;
    transactionId: string;
}
export declare function escrowBuilder(data: EscrowApprovalInterface, seed?: BIP32Interface): Buffer;
export declare function readApprovalEscrowBytes(txBytes: Buffer): {
    approval: number;
    transactionid: string;
};
