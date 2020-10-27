import { Account } from './helper/interfaces';
import { ZBCTransaction, ZBCTransactions } from './helper/wallet/Transaction';
export interface MempoolListParams {
    address?: Account;
    timestampStart?: string;
    timestampEnd?: string;
    pagination?: {
        limit?: number;
        page?: number;
        orderBy?: 0 | 1;
    };
}
declare function getList(params?: MempoolListParams): Promise<ZBCTransactions>;
declare function get(id: string): Promise<ZBCTransaction>;
declare const _default: {
    get: typeof get;
    getList: typeof getList;
};
export default _default;
