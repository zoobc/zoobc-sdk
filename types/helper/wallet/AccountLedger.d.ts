import { GetAccountLedgersResponse } from '../../../grpc/model/accountLedger_pb';
import { Account } from '../interfaces';
export interface AccountLedger {
    accountAddress: Account;
    balanceChange: number;
    blockHeight: number;
    transactionId: string;
    timestamp: number;
    eventType: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13 | 14 | 15 | 16;
}
export interface AccountLedgerList {
    total: number;
    accountLedgerList: AccountLedger[];
}
export declare function toZBCAccountLedger(accountLedger: GetAccountLedgersResponse.AsObject): AccountLedgerList;
