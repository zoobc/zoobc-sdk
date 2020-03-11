/// <reference types="node" />
export { ZooKeyring } from './Keyring';
export { BIP32Interface } from 'bip32';
export { RequestType } from '../grpc/model/auth_pb';
export { ZooTransactionsInterface, ZooTransactionInterface } from './Transactions';
export { NodeListParams } from './Node';
export { RegisterNodeInterface } from './helper/transaction-builder/register-node';
export { UpdateNodeInterface } from './helper/transaction-builder/update-node';
export { ClaimNodeInterface } from './helper/transaction-builder/claim-node';
export { RemoveNodeInterface } from './helper/transaction-builder/remove-node';
export { ZBCAccount } from './Account';
export { getZBCAdress, ZBCAddressValidation, isZBCPublicKeyValid } from './helper/utils';
declare const _default: {
    Transactions: {
        sendMoney: (data: import("./helper/transaction-builder/send-money").SendMoneyInterface, seed: import("bip32").BIP32Interface) => Promise<import("../grpc/model/transaction_pb").PostTransactionResponse.AsObject>;
        get: (address: string, page: number, limit: number) => Promise<import("../grpc/model/transaction_pb").GetTransactionsResponse.AsObject>;
        getOne: (id: string) => Promise<import("../grpc/model/transaction_pb").Transaction.AsObject>;
    };
    Network: {
        list: {
            ip: string;
            default: boolean;
            name: string;
        }[];
        selected: string;
    };
    Wallet: {
        encryptPassphrase: typeof import("./Wallet").encryptPassphrase;
        decryptPassphrase: typeof import("./Wallet").decryptPassphrase;
    };
    Account: {
        getBalance: (address: string) => Promise<import("../grpc/model/accountBalance_pb").GetAccountBalanceResponse.AsObject>;
    };
    Host: {
        getBlock: () => Promise<import("../grpc/model/host_pb").HostInfo.AsObject>;
    };
    Node: {
        register: (data: import("./helper/transaction-builder/register-node").RegisterNodeInterface, childSeed: import("bip32").BIP32Interface) => Promise<import("../grpc/model/transaction_pb").PostTransactionResponse.AsObject>;
        update: (data: import("./helper/transaction-builder/update-node").UpdateNodeInterface, childSeed: import("bip32").BIP32Interface) => Promise<import("../grpc/model/transaction_pb").PostTransactionResponse.AsObject>;
        remove: (data: import("./helper/transaction-builder/remove-node").RemoveNodeInterface, childSeed: import("bip32").BIP32Interface) => Promise<import("../grpc/model/transaction_pb").PostTransactionResponse.AsObject>;
        claim: (data: import("./helper/transaction-builder/claim-node").ClaimNodeInterface, childSeed: import("bip32").BIP32Interface) => Promise<import("../grpc/model/transaction_pb").PostTransactionResponse.AsObject>;
        getHardwareInfo: (networkIP: string, childSeed: import("bip32").BIP32Interface) => import("rxjs").Observable<import("../grpc/model/nodeHardware_pb").GetNodeHardwareResponse.AsObject>;
        generateNodeKey: (networkIP: string, childSeed: import("bip32").BIP32Interface) => Promise<import("../grpc/model/node_pb").GenerateNodeKeyResponse.AsObject>;
        getList: (params?: import("./Node").NodeListParams | undefined) => Promise<import("../grpc/model/nodeRegistration_pb").GetNodeRegistrationsResponse.AsObject>;
        get: (address: string) => Promise<import("../grpc/model/nodeRegistration_pb").GetNodeRegistrationResponse.AsObject>;
    };
    Poown: {
        request: (auth: string, networkIp: string) => Promise<Buffer>;
        createAuth: (requestType: number, seed: import("bip32").BIP32Interface) => string;
    };
    Escrows: {
        approval: (data: import("./helper/transaction-builder/escrow-transaction").EscrowApprovalInterface, seed: import("bip32").BIP32Interface) => Promise<import("../grpc/model/transaction_pb").PostTransactionResponse.AsObject>;
        get: (address: string, page: number, limit: number) => Promise<import("../grpc/model/escrow_pb").GetEscrowTransactionsResponse.AsObject>;
        getOne: (id: string) => Promise<import("../grpc/model/escrow_pb").Escrow.AsObject>;
    };
    Mempool: {
        get: (address: string, page: number, limit: number) => Promise<import("../grpc/model/mempool_pb").GetMempoolTransactionsResponse.AsObject>;
        getOne: (id: string) => Promise<import("../grpc/model/mempool_pb").MempoolTransaction.AsObject>;
    };
};
export default _default;
