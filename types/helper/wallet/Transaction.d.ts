import { GetTransactionsResponse, Transaction } from '../../../grpc/model/transaction_pb';
import { Account } from '../interfaces';
export interface ZBCTransactions {
    total: number;
    transactions: ZBCTransaction[];
}
export interface ZBCTransaction {
    id?: string;
    sender: Account;
    senderAlias?: string;
    recipient: Account;
    recipientAlias?: string;
    timestamp: number;
    fee: number;
    blockId?: string;
    height?: number;
    transactionIndex?: number;
    transactionHash?: string;
    transactionType?: number;
    txBody?: any;
    escrow?: boolean;
    escrowStatus?: number;
    multisig?: boolean;
    approverAddress?: Account;
    commission?: number;
    timeout?: number;
    instruction?: string;
}
export declare function toZBCTransaction(transaction: Transaction.AsObject): ZBCTransaction;
export declare function toZBCTransactions(transactions: GetTransactionsResponse.AsObject): ZBCTransactions;
