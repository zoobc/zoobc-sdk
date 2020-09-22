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
export interface ZooTransactions {
    total: number;
    transactions: ZooTransaction[];
}
export interface ZooTransaction {
    id: string;
    sender: string;
    recipient: string;
    timestamp: number;
    fee: number;
    blockId: string;
    height: number;
    transactionIndex: number;
    transactionHash: string;
    transactionType: number;
    txBody: object;
}
export declare function toTransactions(transactions: Array<Transaction.AsObject>): ZooTransaction[];
export declare function toTransactionListWallet(res: GetTransactionsResponse.AsObject, ownAddress: string): ZooTransactionsInterface;
export declare function getBodyBytes(tx: Transaction.AsObject): {};
export declare function toTransactionWallet(tx: Transaction.AsObject, ownAddress: string): ZooTransactionInterface;
