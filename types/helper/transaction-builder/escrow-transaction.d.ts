/// <reference types="node" />
import { BIP32Interface } from 'bip32';
import { EscrowTransactionInterface } from './send-money';
import { Address } from '../interfaces';
export interface EscrowApprovalInterface extends EscrowTransactionInterface {
    approvalAddress: Address;
    fee: number;
    approvalCode: number;
    transactionId: string;
}
export declare function escrowBuilder(data: EscrowApprovalInterface, seed?: BIP32Interface): Buffer;
export declare function readApprovalEscrowBytes(txBytes: Buffer, offset: number): {
    approval: number;
    transactionid: string;
};
export declare function addEscrowBytes(bytes: Buffer, data: any): Buffer;
