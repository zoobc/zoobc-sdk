/// <reference types="node" />
import { GetPendingTransactionsResponse, GetPendingTransactionDetailByTransactionHashResponse, GetMultisignatureInfoResponse, GetMultisigAddressByParticipantAddressResponse } from '../grpc/model/multiSignature_pb';
import { MultiSigInfo, MultiSigInterface } from './helper/transaction-builder/multisignature';
import { BIP32Interface } from 'bip32';
import { PostTransactionResponse } from '../grpc/model/transaction_pb';
import { Address } from './helper/interfaces';
import { ZBCTransactions } from './helper/wallet/Transaction';
import { MultiSigPendingDetailResponse } from './helper/wallet/MultiSignature';
export declare type MultisigPendingTxResponse = GetPendingTransactionsResponse.AsObject;
export declare type MultisigPendingTxDetailResponse = GetPendingTransactionDetailByTransactionHashResponse.AsObject;
export declare type MultisigInfoResponse = GetMultisignatureInfoResponse.AsObject;
export declare type MultisigPostTransactionResponse = PostTransactionResponse.AsObject;
export declare type GetMultisigAddressResponse = GetMultisigAddressByParticipantAddressResponse.AsObject;
export interface MultisigPendingListParams {
    address?: Address;
    status?: 0 | 1 | 2 | 3;
    pagination: {
        limit?: number;
        page: number;
        orderBy?: 0 | 1;
    };
}
export interface MultisigInfoParams {
    address: Address;
    pagination: {
        limit?: number;
        page: number;
        orderBy?: 0 | 1;
    };
}
declare function generateMultiSigInfo(multiSigAddress: MultiSigInfo): Buffer;
declare function createMultiSigAddress(multiSigAddress: MultiSigInfo): string;
declare function getPendingList(params: MultisigPendingListParams): Promise<ZBCTransactions>;
declare function getPendingByTxHash(txHash: string): Promise<MultiSigPendingDetailResponse>;
declare function getMultisigInfo(params: MultisigInfoParams): Promise<MultisigInfoResponse>;
declare function postTransaction(data: MultiSigInterface, childSeed: BIP32Interface): Promise<PostTransactionResponse.AsObject>;
declare function getMultisigAddress(participantsAddress: string): Promise<GetMultisigAddressResponse>;
declare const _default: {
    getPendingByTxHash: typeof getPendingByTxHash;
    getPendingList: typeof getPendingList;
    createMultiSigAddress: typeof createMultiSigAddress;
    generateMultiSigInfo: typeof generateMultiSigInfo;
    getMultisigInfo: typeof getMultisigInfo;
    postTransaction: typeof postTransaction;
    getMultisigAddress: typeof getMultisigAddress;
};
export default _default;
