import { MultisigPendingTxResponse } from '../../MultiSignature';
import { SendMoneyInterface } from '../transaction-builder/send-money';
export declare function toGetPendingList(res: MultisigPendingTxResponse): {
    count: number;
    page: number;
    pendingtransactionsList: {
        amount: number;
        blockheight: number;
        fee: number;
        latest: boolean;
        senderaddress: string;
        recipientaddress: string;
        status: 0 | 1 | 2 | 3;
        timestamp: number;
        transactionhash: string | Uint8Array;
    }[];
};
export declare function generateTransactionHash(data: SendMoneyInterface): string;
