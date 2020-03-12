import { Observable } from 'rxjs';
import { BIP32Interface } from 'bip32';
import { GetNodeHardwareResponse } from '../grpc/model/nodeHardware_pb';
import { GenerateNodeKeyResponse } from '../grpc/model/node_pb';
import { GetNodeRegistrationResponse, GetNodeRegistrationsResponse } from '../grpc/model/nodeRegistration_pb';
import { RegisterNodeInterface } from './helper/transaction-builder/register-node';
import { UpdateNodeInterface } from './helper/transaction-builder/update-node';
import { RemoveNodeInterface } from './helper/transaction-builder/remove-node';
import { ClaimNodeInterface } from './helper/transaction-builder/claim-node';
import { PostTransactionResponse } from '../grpc/model/transaction_pb';
export interface NodeListParams {
    minHeight?: number;
    maxHeight?: number;
    status?: 0 | 1 | 2;
    pagination?: {
        limit?: number;
        page?: number;
        orderBy?: 0 | 1;
    };
}
declare function getHardwareInfo(networkIP: string, childSeed: BIP32Interface): Observable<GetNodeHardwareResponse.AsObject>;
declare function generateNodeKey(networkIP: string, childSeed: BIP32Interface): Promise<GenerateNodeKeyResponse.AsObject>;
declare function getList(params?: NodeListParams): Promise<GetNodeRegistrationsResponse.AsObject>;
declare function get(address: string): Promise<GetNodeRegistrationResponse.AsObject>;
declare function register(data: RegisterNodeInterface, childSeed: BIP32Interface): Promise<PostTransactionResponse.AsObject>;
declare function update(data: UpdateNodeInterface, childSeed: BIP32Interface): Promise<PostTransactionResponse.AsObject>;
declare function remove(data: RemoveNodeInterface, childSeed: BIP32Interface): Promise<PostTransactionResponse.AsObject>;
declare function claim(data: ClaimNodeInterface, childSeed: BIP32Interface): Promise<PostTransactionResponse.AsObject>;
declare const _default: {
    register: typeof register;
    update: typeof update;
    remove: typeof remove;
    claim: typeof claim;
    getHardwareInfo: typeof getHardwareInfo;
    generateNodeKey: typeof generateNodeKey;
    getList: typeof getList;
    get: typeof get;
};
export default _default;
