/// <reference types="node" />
import { MultisigPendingTxResponse } from '../../MultiSignature';
export declare function toGetPendingList(res: MultisigPendingTxResponse): {
    count: number;
    page: number;
    pendingtransactionsList: {
        amount: string;
        blockheight: number;
        fee: string;
        latest: boolean;
        senderaddress: string;
        recipientaddress: string;
        status: 0 | 1 | 2 | 3;
        timestamp: string;
        transactionhash: string | Uint8Array;
    }[];
};
export declare function generateTransactionHash(buffer: Buffer): string;
