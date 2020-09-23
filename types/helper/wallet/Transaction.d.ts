import { GetTransactionsResponse, Transaction } from '../../../grpc/model/transaction_pb';
export interface ZooTransactionsInterface {
    total: number;
    transactions: ZooTransactionInterface[];
}
export interface ZooTransactionInterface {
    id: string;
    address: string;
    timestamp: number;
    fee: number;
    type: string;
    amount: number;
    blockId: string;
    height: number;
    transactionIndex: number;
}
export declare function toTransactionListWallet(res: GetTransactionsResponse.AsObject, ownAddress: string): ZooTransactionsInterface;
export declare function toTransactionWallet(tx: Transaction.AsObject, ownAddress: string): ZooTransactionInterface;
