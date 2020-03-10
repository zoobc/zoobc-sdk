/// <reference types="node" />
import { BIP32Interface } from 'bip32';
export interface EscrowApprovalInterface {
    approvalAddress: string;
    fee: number;
    approvalCode: number;
    transactionId: string;
}
export declare function escrowBuilder(data: EscrowApprovalInterface, seed: BIP32Interface): Buffer;
