/// <reference types="node" />
import { BIP32Interface } from 'bip32';
export interface EscrowApprovalInterface {
    approvalAddress: string;
    fee: number;
    approvalCode: number;
    transactionId: string;
}
<<<<<<< HEAD
export declare function escrowBuilder(data: EscrowApprovalInterface, seed: BIP32Interface): Buffer;
export declare function readApprovalEscrowBytes(txBytes: Buffer, bytesConverted: any): any;
=======
export declare function escrowBuilder(data: EscrowApprovalInterface, seed?: BIP32Interface): Buffer;
>>>>>>> 6eff0a072c6aab7254cc23bfbebd4450568e0914
