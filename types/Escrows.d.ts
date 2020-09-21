import { BIP32Interface } from 'bip32';
import { EscrowApprovalInterface } from './helper/transaction-builder/escrow-transaction';
import { Escrow, GetEscrowTransactionsResponse } from '../grpc/model/escrow_pb';
import { PostTransactionResponse } from '../grpc/model/transaction_pb';
export declare type EscrowTransactionsResponse = GetEscrowTransactionsResponse.AsObject;
export declare type EscrowTransactionResponse = Escrow.AsObject;
export declare type ApprovalEscrowTransactionResponse = PostTransactionResponse.AsObject;
export interface EscrowListParams {
    approverAddress?: string;
    sender?: string;
    recipient?: string;
    blockHeightStart?: number;
    blockHeightEnd?: number;
    id?: string;
    statusList?: (0 | 1 | 2 | 3)[];
    pagination?: {
        limit?: number;
        page?: number;
        orderBy?: 0 | 1;
        orderField?: string;
    };
    latest?: boolean;
}
declare function getList(params?: EscrowListParams): Promise<EscrowTransactionsResponse>;
declare function get(id: string): Promise<EscrowTransactionResponse>;
declare function approval(data: EscrowApprovalInterface, seed: BIP32Interface): Promise<ApprovalEscrowTransactionResponse>;
declare function readEscrowBody(transactionbodybytes: string | Uint8Array): {
    approvalCode: number;
    txId: string;
};
declare const _default: {
    approval: typeof approval;
    get: typeof get;
    getList: typeof getList;
    readEscrowBody: typeof readEscrowBody;
};
export default _default;
