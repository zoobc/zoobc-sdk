import { Address } from './helper/interfaces';
export interface AccountBalance {
    address: Address;
    blockHeight: number;
    spendableBalance: number;
    balance: number;
    popRevenue: string;
    latest: boolean;
}
declare function getBalance(address: Address): Promise<AccountBalance>;
declare function getBalances(addresses: Address[]): Promise<AccountBalance[]>;
declare const _default: {
    getBalance: typeof getBalance;
    getBalances: typeof getBalances;
};
export default _default;
