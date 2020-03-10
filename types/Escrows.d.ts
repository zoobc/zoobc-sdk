import { BIP32Interface } from 'bip32';
import { EscrowApprovalInterface } from './helper/transaction-builder/escrow-transaction';
import { Escrow, GetEscrowTransactionsResponse } from '../grpc/model/escrow_pb';
import { PostTransactionResponse } from '../grpc/model/transaction_pb';
declare function get(address: string, page: number, limit: number): Promise<GetEscrowTransactionsResponse.AsObject>;
declare function getOne(id: string): Promise<Escrow.AsObject>;
declare function approval(data: EscrowApprovalInterface, seed: BIP32Interface): Promise<PostTransactionResponse.AsObject>;
declare const _default: {
    approval: typeof approval;
    get: typeof get;
    getOne: typeof getOne;
};
export default _default;
