import { Escrow as EscrowResponse, GetEscrowTransactionsResponse } from '../../../grpc/model/escrow_pb';
import { Account } from '../interfaces';
export interface Escrow {
    id: string;
    sender: Account;
    recipient: Account;
    approver: Account;
    amount: number;
    commission: number;
    timeout: number;
    status: 0 | 1 | 2 | 3;
    blockHeight: number;
    latest: boolean;
    instruction: string;
}
export interface Escrows {
    total: number;
    escrowList: Escrow[];
}
export declare function toZBCEscrow(escrow: EscrowResponse.AsObject): Escrow;
export declare function toZBCEscrows(escrows: GetEscrowTransactionsResponse.AsObject): Escrows;
