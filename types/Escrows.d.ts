import { BIP32Interface } from 'bip32';
import { EscrowApprovalInterface } from './helper/transaction-builder/escrow-transaction';
import { PostTransactionResponse } from '../grpc/model/transaction_pb';
import { Address } from './helper/interfaces';
import { Escrows, Escrow } from './helper/wallet/Escrows';
export declare type ApprovalEscrowTransactionResponse = PostTransactionResponse.AsObject;
export interface EscrowListParams {
    approverAddress?: Address;
    sender?: Address;
    recipient?: Address;
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
declare function getList(params?: EscrowListParams): Promise<Escrows>;
declare function get(id: string): Promise<Escrow>;
declare function approval(data: EscrowApprovalInterface, seed: BIP32Interface): Promise<ApprovalEscrowTransactionResponse>;
declare const _default: {
    approval: typeof approval;
    get: typeof get;
    getList: typeof getList;
};
export default _default;
