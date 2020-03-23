/// <reference types="node" />
export { ZooKeyring } from './Keyring';
export { BIP32Interface } from 'bip32';
export { RequestType } from '../grpc/model/auth_pb';
export { EscrowListParams } from './Escrows';
export { NodeListParams, NodeParams } from './Node';
export { MempoolListParams } from './Mempool';
export { TransactionListParams } from './Transactions';
export { BlockListParams } from './Block';
export { HostInterface } from './Network';
export { RegisterNodeInterface } from './helper/transaction-builder/register-node';
export { UpdateNodeInterface } from './helper/transaction-builder/update-node';
export { ClaimNodeInterface } from './helper/transaction-builder/claim-node';
export { RemoveNodeInterface } from './helper/transaction-builder/remove-node';
export { getZBCAdress, ZBCAddressValidation, isZBCPublicKeyValid } from './helper/utils';
export { toUnconfirmedSendMoneyWallet, toUnconfirmTransactionNodeWallet } from './helper/wallet/Mempool';
export { toTransactionListWallet, ZooTransactionsInterface } from './helper/wallet/Transaction';
declare const zoobc: {
    Transactions: {
        sendMoney: (data: import("./helper/transaction-builder/send-money").SendMoneyInterface, seed: import("bip32").BIP32Interface) => Promise<import("../grpc/model/transaction_pb").PostTransactionResponse.AsObject>;
        get: (id: string) => Promise<import("../grpc/model/transaction_pb").Transaction.AsObject>;
        getList: (params?: import("./Transactions").TransactionListParams | undefined) => Promise<import("../grpc/model/transaction_pb").GetTransactionsResponse.AsObject>;
    };
    Network: {
        list: (hosts: import("./Network").HostInterface[]) => void;
        set: (idx: number) => void;
        selected: () => import("./Network").HostInterface;
    };
    Wallet: {
        encryptPassphrase: typeof import("./Wallet").encryptPassphrase;
        decryptPassphrase: typeof import("./Wallet").decryptPassphrase;
    };
    Account: {
        getBalance: typeof import("./Account").getBalance;
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
        get: (params: import("./Node").NodeParams) => Promise<import("../grpc/model/nodeRegistration_pb").GetNodeRegistrationResponse.AsObject>;
    };
    Poown: {
        request: (auth: string, networkIp: string) => Promise<Buffer>;
        createAuth: (requestType: number, seed: import("bip32").BIP32Interface) => string;
    };
    Escrows: {
        approval: (data: import("./helper/transaction-builder/escrow-transaction").EscrowApprovalInterface, seed: import("bip32").BIP32Interface) => Promise<import("../grpc/model/transaction_pb").PostTransactionResponse.AsObject>;
        get: (id: string) => Promise<import("../grpc/model/escrow_pb").Escrow.AsObject>;
        getList: (params?: import("./Escrows").EscrowListParams | undefined) => Promise<import("../grpc/model/escrow_pb").GetEscrowTransactionsResponse.AsObject>;
    };
    Mempool: {
        get: (id: string) => Promise<import("../grpc/model/mempool_pb").MempoolTransaction.AsObject>;
        getList: (params?: import("./Mempool").MempoolListParams | undefined) => Promise<import("../grpc/model/mempool_pb").GetMempoolTransactionsResponse.AsObject>;
    };
    Block: {
        getBlocks: (params: import("./Block").BlockListParams) => Promise<import("../grpc/model/block_pb").GetBlocksResponse.AsObject>;
        getBlockById: (id: string) => Promise<import("../grpc/model/block_pb").BlockExtendedInfo.AsObject>;
        getBlockByHeight: (height: number) => Promise<import("../grpc/model/block_pb").BlockExtendedInfo.AsObject>;
    };
};
export default zoobc;
