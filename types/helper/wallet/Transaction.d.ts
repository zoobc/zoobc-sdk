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
export interface ZBCTransactions {
    total: number;
    transactions: ZBCTransaction[];
}
export interface ZBCTransaction {
    id: string;
    sender: string;
    senderAlias?: string;
    recipient: string;
    recipientAlias?: string;
    timestamp: number;
    fee: number;
    blockId: string;
    height: number;
    transactionIndex: number;
    transactionHash: string;
    transactionType: number;
    txBody: any;
    escrow?: boolean;
    escrowStatus?: number;
    multisig?: boolean;
}
export declare function toZBCTransactions(transactions: Array<Transaction.AsObject>): ZBCTransaction[];
export declare function toTransactionListWallet(res: GetTransactionsResponse.AsObject, ownAddress: string): ZooTransactionsInterface;
export declare function toTransactionWallet(tx: Transaction.AsObject, ownAddress: string): ZooTransactionInterface;
