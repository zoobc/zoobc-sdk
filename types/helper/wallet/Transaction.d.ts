import { GetTransactionsResponse, Transaction } from '../../../grpc/model/transaction_pb';
import { Address } from '../interfaces';
export interface ZBCTransactions {
    total: number;
    transactions: ZBCTransaction[];
}
export interface ZBCTransaction {
    id?: string;
    sender: Address;
    senderAlias?: string;
    recipient: Address;
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
    approverAddress?: Address;
    commission?: number;
    timeout?: number;
    instruction?: string;
}
export declare function toZBCTransaction(transaction: Transaction.AsObject): ZBCTransaction;
export declare function toZBCTransactions(transactions: GetTransactionsResponse.AsObject): ZBCTransactions;
