/// <reference types="node" />
import { MultisigPendingTxResponse, MultisigPendingTxDetailResponse } from '../../MultiSignature';
import { ZBCTransaction, ZBCTransactions } from '../..';
import { MultiSignatureInfo, PendingSignature } from '../../../grpc/model/multiSignature_pb';
export declare type multisignatureinfo = MultiSignatureInfo.AsObject;
export declare type pendingsignaturesList = Array<PendingSignature.AsObject>;
export interface MultiSigPendingDetailResponse {
    pendingtransaction: ZBCTransaction;
    pendingsignaturesList: pendingsignaturesList;
    multisignatureinfo?: multisignatureinfo;
}
export declare function toGetPendingList(res: MultisigPendingTxResponse): ZBCTransactions;
export declare function toGetPending(tx: any): ZBCTransaction;
export declare function toGetPendingDetail(tx: MultisigPendingTxDetailResponse): MultiSigPendingDetailResponse;
export declare function generateTransactionHash(buffer: Buffer): string;
