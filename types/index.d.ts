/// <reference types="node" />
export { ZooKeyring } from './Keyring';
export { BIP32Interface } from 'bip32';
export { RequestType } from '../grpc/model/auth_pb';
export { Subscription } from 'rxjs';
export { EscrowListParams, EscrowTransactionsResponse, EscrowTransactionResponse, ApprovalEscrowTransactionResponse } from './Escrows';
export { NodeListParams, NodeParams, NodeHardwareResponse, GenerateNodeKeyResponses, NodeRegistrationsResponse, NodePostTransactionResponse, } from './Node';
export { MempoolListParams, MempoolTransactionsResponse, MempoolTransactionResponse } from './Mempool';
export { TransactionListParams, TransactionsResponse, TransactionResponse, PostTransactionResponses, TransactionMinimumFeeResponse, } from './Transactions';
export { BlockListParams, BlocksResponse, BlockResponse } from './Block';
export { MultisigPendingListParams, MultisigInfoParams, MultisigPendingTxResponse, MultisigPendingTxDetailResponse, MultisigInfoResponse, MultisigPostTransactionResponse, } from './MultiSignature';
export { AccountLedgerListParams, AccountLedgersResponse } from './AccountLedger';
export { AccountDatasetListParams, AccountDatasetParams, AccountDatasetsResponse, AccountDatasetResponse, SetupDatasetResponse, RemoveAccountDatasetResponse, } from './AccountDataset';
export { HostInterface } from './Network';
export { RegisterNodeInterface } from './helper/transaction-builder/register-node';
export { UpdateNodeInterface } from './helper/transaction-builder/update-node';
export { ClaimNodeInterface } from './helper/transaction-builder/claim-node';
export { RemoveNodeInterface } from './helper/transaction-builder/remove-node';
export { EscrowApprovalInterface } from './helper/transaction-builder/escrow-transaction';
export { SendMoneyInterface, sendMoneyBuilder } from './helper/transaction-builder/send-money';
export { RemoveDatasetInterface } from './helper/transaction-builder/remove-account-dataset';
export { SetupDatasetInterface } from './helper/transaction-builder/setup-account-dataset';
export { getZBCAdress, isZBCAddressValid, ZBCAddressToBytes, readInt64 } from './helper/utils';
export { toUnconfirmedSendMoneyWallet, toUnconfirmTransactionNodeWallet } from './helper/wallet/Mempool';
export { toTransactionListWallet, ZooTransactionsInterface } from './helper/wallet/Transaction';
export { bufferToBase64 } from './helper/converters';
export { MultiSigInterface, signTransactionHash, MultiSigAddress, MultiSigInfo, SignatureInfo, } from './helper/transaction-builder/multisignature';
export { toGetPendingList, generateTransactionHash } from './helper/wallet/MultiSignature';
export { AccountBalanceResponse, AccountBalancesResponse } from './Account';
export { HostInfoResponse } from './Host';
export { AccountDatasetProperty } from '../grpc/model/accountDataset_pb';
export { EscrowStatus, EscrowApproval } from '../grpc/model/escrow_pb';
export { EventType } from '../grpc/model/event_pb';
export { PendingTransactionStatus } from '../grpc/model/multiSignature_pb';
export { NodeRegistrationState } from '../grpc/model/nodeRegistration_pb';
export { OrderBy } from '../grpc/model/pagination_pb';
export { SignatureType, PrivateKeyBytesLength, BitcoinPublicKeyFormat } from '../grpc/model/signature_pb';
export { SpinePublicKeyAction } from '../grpc/model/spine_pb';
export { SpineBlockManifestType } from '../grpc/model/spineBlockManifest_pb';
export { TransactionType } from '../grpc/model/transaction_pb';
declare const zoobc: {
    Transactions: {
        sendMoney: (data: import("./helper/transaction-builder/send-money").SendMoneyInterface, seed: import("bip32").BIP32Interface) => Promise<import("../grpc/model/transaction_pb").PostTransactionResponse.AsObject>;
        get: (id: string) => Promise<import("../grpc/model/transaction_pb").Transaction.AsObject>;
        getList: (params?: import("./Transactions").TransactionListParams | undefined) => Promise<import("../grpc/model/transaction_pb").GetTransactionsResponse.AsObject>;
        getTransactionMinimumFee: (data: import("./helper/transaction-builder/send-money").SendMoneyInterface, seed: import("bip32").BIP32Interface) => Promise<import("../grpc/model/transaction_pb").GetTransactionMinimumFeeResponse.AsObject>;
    };
    Network: {
        list: (hosts: import("./Network").HostInterface[]) => void;
        set: (idx: number) => void;
        selected: () => import("./Network").HostInterface;
        ping: () => Promise<string>;
    };
    Wallet: {
        encryptPassphrase: (passphrase: string, password: string, salt?: string) => string;
        decryptPassphrase: (encPassphrase: string, password: string, salt?: string) => string;
    };
    Account: {
        getBalance: (address: string) => Promise<import("../grpc/model/accountBalance_pb").GetAccountBalanceResponse.AsObject>;
        getBalances: (addresses: string[]) => Promise<import("../grpc/model/accountBalance_pb").GetAccountBalancesResponse.AsObject>;
    };
    Host: {
        getInfo: () => Promise<import("../grpc/model/host_pb").HostInfo.AsObject>;
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
    MultiSignature: {
        getPendingByTxHash: (txHash: string) => Promise<import("../grpc/model/multiSignature_pb").GetPendingTransactionDetailByTransactionHashResponse.AsObject>;
        getPendingList: (params: import("./MultiSignature").MultisigPendingListParams) => Promise<import("../grpc/model/multiSignature_pb").GetPendingTransactionsResponse.AsObject>;
        createMultiSigAddress: (multiSigAddress: import("./helper/transaction-builder/multisignature").MultiSigAddress) => string;
        generateMultiSigInfo: (multiSigAddress: import("./helper/transaction-builder/multisignature").MultiSigAddress) => Buffer;
        getMultisigInfo: (params: import("./MultiSignature").MultisigInfoParams) => Promise<import("../grpc/model/multiSignature_pb").GetMultisignatureInfoResponse.AsObject>;
        postTransaction: (data: import("./helper/transaction-builder/multisignature").MultiSigInterface, childSeed: import("bip32").BIP32Interface) => Promise<import("../grpc/model/transaction_pb").PostTransactionResponse.AsObject>;
    };
    AccountDataset: {
        getList: typeof import("./AccountDataset").getList;
        get: typeof import("./AccountDataset").get;
        setupDataset: typeof import("./AccountDataset").setupDataset;
        removeDataset: typeof import("./AccountDataset").removeDataset;
    };
    AccountLedger: {
        getList: typeof import("./AccountLedger").getList;
    };
};
export default zoobc;
