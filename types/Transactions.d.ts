import { PostTransactionResponse, GetTransactionsResponse, Transaction } from '../grpc/model/transaction_pb';
import { SendMoneyInterface } from './helper/transaction-builder/send-money';
import { BIP32Interface } from 'bip32';
export interface ZooTransactionsInterface {
    total: number;
    transactions: ZooTransactionInterface[];
}
export interface ZooTransactionInterface {
    id: string;
    address: string;
    sender: string;
    recipient: string;
    timestamp: number;
    fee: number;
    type: string;
    amount: number;
    blockId: string;
    height: number;
    transactionIndex: number;
}
declare function get(address: string, page: number, limit: number): Promise<GetTransactionsResponse.AsObject>;
declare function getOne(id: string): Promise<Transaction.AsObject>;
declare function sendMoney(data: SendMoneyInterface, seed: BIP32Interface): Promise<PostTransactionResponse.AsObject>;
declare const _default: {
    sendMoney: typeof sendMoney;
    get: typeof get;
    getOne: typeof getOne;
};
export default _default;
