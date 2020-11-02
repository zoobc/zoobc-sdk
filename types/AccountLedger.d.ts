import { Address } from './helper/interfaces';
import { AccountLedgerList } from './helper/wallet/AccountLedger';
export interface AccountLedgerListParams {
    address?: Address;
    eventType?: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13 | 14 | 15 | 16;
    transactionId?: string;
    timeStampStart?: number;
    timeStampEnd?: number;
    pagination?: {
        limit?: number;
        page?: number;
        orderBy?: 0 | 1;
        orderField?: string;
    };
}
export declare function getList(params?: AccountLedgerListParams): Promise<AccountLedgerList>;
declare const _default: {
    getList: typeof getList;
};
export default _default;
