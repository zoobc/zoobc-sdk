import { MultisigPendingTxResponse } from '../../MultiSignature';
export declare function toGetPendingList(res: MultisigPendingTxResponse): {
    count: number;
    page: number;
    pendingtransactionsList: {
        amount: number;
        blockheight: number;
        fee: number;
        latest: boolean;
        senderaddress: string;
        status: 0 | 1 | 2 | 3;
        timestamp: number;
        transactionhash: string | Uint8Array;
    }[];
};
