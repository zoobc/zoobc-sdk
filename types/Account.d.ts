import { GetAccountBalanceResponse } from '../grpc/model/accountBalance_pb';
declare function getBalance(address: string): Promise<GetAccountBalanceResponse.AsObject>;
declare const _default: {
    getBalance: typeof getBalance;
};
export default _default;
