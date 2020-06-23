import { GetAccountBalanceResponse, GetAccountBalancesResponse } from '../grpc/model/accountBalance_pb';
declare function getBalance(address: string): Promise<GetAccountBalanceResponse.AsObject>;
declare function getBalances(addresses: string[]): Promise<GetAccountBalancesResponse.AsObject>;
declare const _default: {
    getBalance: typeof getBalance;
    getBalances: typeof getBalances;
};
export default _default;
