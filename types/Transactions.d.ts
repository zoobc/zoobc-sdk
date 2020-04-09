import { PostTransactionResponse, GetTransactionsResponse, Transaction, GetTransactionMinimumFeeResponse } from '../grpc/model/transaction_pb';
import { SendMoneyInterface } from './helper/transaction-builder/send-money';
import { BIP32Interface } from 'bip32';
export interface TransactionListParams {
    address?: string;
    height?: number;
    transactionType?: number;
    timestampStart?: string;
    timestampEnd?: string;
    pagination?: {
        limit?: number;
        page?: number;
        orderBy?: 0 | 1;
    };
}
declare function getList(params?: TransactionListParams): Promise<GetTransactionsResponse.AsObject>;
declare function get(id: string): Promise<Transaction.AsObject>;
declare function sendMoney(data: SendMoneyInterface, seed: BIP32Interface): Promise<PostTransactionResponse.AsObject>;
declare function getTransactionMinimumFee(data: SendMoneyInterface, seed: BIP32Interface): Promise<GetTransactionMinimumFeeResponse.AsObject>;
declare const _default: {
    sendMoney: typeof sendMoney;
    get: typeof get;
    getList: typeof getList;
    getTransactionMinimumFee: typeof getTransactionMinimumFee;
};
export default _default;
