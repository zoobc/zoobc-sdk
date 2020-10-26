import { Account } from './helper/interfaces';
export interface AccountBalance {
    account: Account;
    blockHeight: number;
    spendableBalance: number;
    balance: number;
    popRevenue: string;
    latest: boolean;
}
declare function getBalance(account: Account): Promise<AccountBalance>;
declare function getBalances(accounts: Account[]): Promise<AccountBalance[]>;
declare const _default: {
    getBalance: typeof getBalance;
    getBalances: typeof getBalances;
};
export default _default;
