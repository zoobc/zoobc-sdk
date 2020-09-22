import { Observable } from 'rxjs';
import { BIP32Interface } from 'bip32';
import { GetNodeHardwareResponse } from '../grpc/model/nodeHardware_pb';
import { GenerateNodeKeyResponse } from '../grpc/model/node_pb';
import { GetNodeRegistrationResponse, GetNodeRegistrationsResponse, GetPendingNodeRegistrationsResponse, GetMyNodePublicKeyResponse } from '../grpc/model/nodeRegistration_pb';
import { RegisterNodeInterface } from './helper/transaction-builder/register-node';
import { UpdateNodeInterface } from './helper/transaction-builder/update-node';
import { RemoveNodeInterface } from './helper/transaction-builder/remove-node';
import { ClaimNodeInterface } from './helper/transaction-builder/claim-node';
import { PostTransactionResponse } from '../grpc/model/transaction_pb';
export declare type NodeHardwareResponse = GetNodeHardwareResponse.AsObject;
export declare type GenerateNodeKeyResponses = GenerateNodeKeyResponse.AsObject;
export declare type NodeRegistrationsResponse = GetNodeRegistrationResponse.AsObject;
export declare type NodePostTransactionResponse = PostTransactionResponse.AsObject;
export declare type GetPendingNodeRegistrationResponse = GetPendingNodeRegistrationsResponse.AsObject;
export declare type GetMyNodePublicKeyResponses = GetMyNodePublicKeyResponse.AsObject;
export interface NodeListParams {
    minHeight?: number;
    maxHeight?: number;
    status?: [0 | 1 | 2];
    pagination?: {
        limit?: number;
        page?: number;
        orderBy?: 0 | 1;
    };
}
export interface NodeParams {
    owner?: string;
    publicKey?: string;
    height?: number;
}
declare function getHardwareInfo(networkIP: string, childSeed: BIP32Interface): Observable<NodeHardwareResponse>;
declare function generateNodeKey(networkIP: string, childSeed: BIP32Interface): Promise<GenerateNodeKeyResponses>;
declare function getList(params?: NodeListParams): Promise<GetNodeRegistrationsResponse.AsObject>;
declare function get(params: NodeParams): Promise<NodeRegistrationsResponse>;
declare function register(data: RegisterNodeInterface, childSeed: BIP32Interface): Promise<NodePostTransactionResponse>;
declare function update(data: UpdateNodeInterface, childSeed: BIP32Interface): Promise<NodePostTransactionResponse>;
declare function remove(data: RemoveNodeInterface, childSeed: BIP32Interface): Promise<NodePostTransactionResponse>;
declare function claim(data: ClaimNodeInterface, childSeed: BIP32Interface): Promise<NodePostTransactionResponse>;
declare function getPending(limit: number, childSeed: BIP32Interface): Observable<GetPendingNodeRegistrationResponse>;
export declare function getMyNodePublicKey(networkIP: string): Promise<GetMyNodePublicKeyResponses>;
declare const _default: {
    register: typeof register;
    update: typeof update;
    remove: typeof remove;
    claim: typeof claim;
    getHardwareInfo: typeof getHardwareInfo;
    generateNodeKey: typeof generateNodeKey;
    getList: typeof getList;
    get: typeof get;
    getPending: typeof getPending;
    getMyNodePublicKey: typeof getMyNodePublicKey;
};
export default _default;
