import { GetAccountBalanceResponse, GetAccountBalancesResponse } from '../grpc/model/accountBalance_pb';
export declare type AccountBalanceResponse = GetAccountBalanceResponse.AsObject;
export declare type AccountBalancesResponse = GetAccountBalancesResponse.AsObject;
declare function getBalance(address: string): Promise<AccountBalanceResponse>;
declare function getBalances(addresses: string[]): Promise<AccountBalancesResponse>;
declare const _default: {
    getBalance: typeof getBalance;
    getBalances: typeof getBalances;
};
export default _default;
