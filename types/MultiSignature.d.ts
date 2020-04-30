/// <reference types="node" />
import { GetPendingTransactionsResponse, GetPendingTransactionDetailByTransactionHashResponse, GetMultisignatureInfoResponse } from '../grpc/model/multiSignature_pb';
export declare type MultisigPendingTxResponse = GetPendingTransactionsResponse.AsObject;
export declare type MultisigPendingTxDetailResponse = GetPendingTransactionDetailByTransactionHashResponse.AsObject;
export declare type MultisigInfoResponse = GetMultisignatureInfoResponse.AsObject;
export interface MultiSigAddress {
    participants: string[];
    nonce: number;
    minSigs: number;
}
export interface MultisigPendingListParams {
    address?: string;
    status?: 0 | 1 | 2 | 3;
    pagination: {
        limit?: number;
        page: number;
        orderBy?: 0 | 1;
    };
}
export interface MultisigInfoParams {
    address: string;
    pagination: {
        limit?: number;
        page: number;
        orderBy?: 0 | 1;
    };
}
declare function generateMultiSigInfo(multiSigAddress: MultiSigAddress): Buffer;
declare function createMultiSigAddress(multiSigAddress: MultiSigAddress): string;
declare function getPendingList(params: MultisigPendingListParams): Promise<MultisigPendingTxResponse>;
declare function getPendingByTxHash(txHash: string): Promise<MultisigPendingTxDetailResponse>;
declare function getMultisigInfo(params: MultisigInfoParams): Promise<MultisigInfoResponse>;
declare const _default: {
    getPendingByTxHash: typeof getPendingByTxHash;
    getPendingList: typeof getPendingList;
    createMultiSigAddress: typeof createMultiSigAddress;
    generateMultiSigInfo: typeof generateMultiSigInfo;
    getMultisigInfo: typeof getMultisigInfo;
};
export default _default;
