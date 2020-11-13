import { Escrow as EscrowResponse, GetEscrowTransactionsResponse } from '../../../grpc/model/escrow_pb';
import { Address } from '../interfaces';
export interface Escrow {
    id: string;
    sender: Address;
    recipient: Address;
    approver: Address;
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
