import { BIP32Interface } from 'bip32';
import { EscrowApprovalInterface } from './helper/transaction-builder/escrow-transaction';
import { Escrow, GetEscrowTransactionsResponse } from '../grpc/model/escrow_pb';
import { PostTransactionResponse } from '../grpc/model/transaction_pb';
export interface EscrowListParams {
    approverAddress?: string;
    blockHeightStart?: number;
    blockHeightEnd?: number;
    id?: string;
    statusList?: (0 | 1 | 2 | 3)[];
    pagination?: {
        limit?: number;
        page?: number;
        orderBy?: 0 | 1;
    };
}
declare function getList(params?: EscrowListParams): Promise<GetEscrowTransactionsResponse.AsObject>;
declare function get(id: string): Promise<Escrow.AsObject>;
declare function approval(data: EscrowApprovalInterface, seed: BIP32Interface): Promise<PostTransactionResponse.AsObject>;
declare const _default: {
    approval: typeof approval;
    get: typeof get;
    getList: typeof getList;
};
export default _default;
