import { Observable } from 'rxjs';
import { BIP32Interface } from 'bip32';
import { GetNodeHardwareResponse } from '../grpc/model/nodeHardware_pb';
import { GenerateNodeKeyResponse } from '../grpc/model/node_pb';
import { GetNodeRegistrationResponse } from '../grpc/model/nodeRegistration_pb';
import { RegisterNodeInterface } from './helper/transaction-builder/register-node';
import { UpdateNodeInterface } from './helper/transaction-builder/update-node';
import { RemoveNodeInterface } from './helper/transaction-builder/remove-node';
import { ClaimNodeInterface } from './helper/transaction-builder/claim-node';
import { PostTransactionResponse } from '../grpc/model/transaction_pb';
declare function getHardwareInfo(networkIP: string, childSeed: BIP32Interface): Observable<GetNodeHardwareResponse.AsObject>;
declare function generateNodeKey(networkIP: string, childSeed: BIP32Interface): Promise<GenerateNodeKeyResponse.AsObject>;
declare function getOne(address: string): Promise<GetNodeRegistrationResponse.AsObject>;
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
    getOne: typeof getOne;
};
export default _default;
