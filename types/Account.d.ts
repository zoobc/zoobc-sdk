/// <reference types="node" />
export interface ZBCAccount {
    accountAddress: string;
    accountType: Buffer;
    blockHeight: number;
    spendableBalance: number;
    balance: number;
    popRevenue: string;
    latest: boolean;
}
declare function getBalance(address: string, accountType?: Buffer): Promise<ZBCAccount>;
declare function getBalances(accounts: {
    address: string;
    type: Buffer;
}[]): Promise<ZBCAccount[]>;
declare const _default: {
    getBalance: typeof getBalance;
    getBalances: typeof getBalances;
};
export default _default;
