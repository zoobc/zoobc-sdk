import { PostTransactionResponse, GetTransactionsResponse, Transaction, GetTransactionMinimumFeeResponse } from '../grpc/model/transaction_pb';
import { SendMoneyInterface } from './helper/transaction-builder/send-money';
import { BIP32Interface } from 'bip32';
import { Account } from './helper/interfaces';
import { ZBCTransaction, ZBCTransactions } from './helper/wallet/Transaction';
export declare type TransactionsResponse = GetTransactionsResponse.AsObject;
export declare type TransactionResponse = Transaction.AsObject;
export declare type PostTransactionResponses = PostTransactionResponse.AsObject;
export declare type TransactionMinimumFeeResponse = GetTransactionMinimumFeeResponse.AsObject;
export interface TransactionListParams {
    address?: Account;
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
declare function getList(params?: TransactionListParams): Promise<ZBCTransactions>;
declare function get(id: string): Promise<ZBCTransaction>;
declare function sendMoney(data: SendMoneyInterface, seed: BIP32Interface): Promise<PostTransactionResponses>;
declare const _default: {
    sendMoney: typeof sendMoney;
    get: typeof get;
    getList: typeof getList;
};
export default _default;
