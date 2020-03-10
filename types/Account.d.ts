import { GetAccountBalanceResponse } from '../grpc/model/accountBalance_pb';
export interface ZBCAccount {
    accountaddress: string;
    blockheight: number;
    spendablebalance: number;
    balance: number;
    poprevenue: number;
    latest: boolean;
}
declare function getBalance(address: string): Promise<GetAccountBalanceResponse.AsObject>;
declare const _default: {
    getBalance: typeof getBalance;
};
export default _default;
