import { GetAccountBalanceResponse, GetAccountBalancesResponse } from '../grpc/model/accountBalance_pb';
export interface AccountBalancesParams {
    accountAddressList: string[];
}
declare function getBalance(address: string): Promise<GetAccountBalanceResponse.AsObject>;
declare function getBalances(params: AccountBalancesParams): Promise<GetAccountBalancesResponse.AsObject>;
declare const _default: {
    getBalance: typeof getBalance;
    getBalances: typeof getBalances;
};
export default _default;
