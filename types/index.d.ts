/// <reference types="node" />
export { ZooKeyring } from './Keyring';
export { Ledger } from './Ledger';
export { BIP32Interface } from 'bip32';
export { RequestType } from '../grpc/model/auth_pb';
export { Subscription } from 'rxjs';
export { EscrowListParams, EscrowTransactionsResponse, EscrowTransactionResponse, ApprovalEscrowTransactionResponse } from './Escrows';
export { NodeListParams, NodeParams, NodeHardwareResponse, GenerateNodeKeyResponses, NodeRegistrationsResponse, NodePostTransactionResponse, GetPendingNodeRegistrationResponse, GetMyNodePublicKeyResponses, GetNodeTimeResponses, } from './Node';
export { MempoolListParams, MempoolTransactionsResponse, MempoolTransactionResponse } from './Mempool';
export { TransactionListParams, TransactionsResponse, TransactionResponse, PostTransactionResponses, TransactionMinimumFeeResponse, } from './Transactions';
export { BlocksResponse, BlockResponse } from './Block';
export { MultisigPendingListParams, MultisigInfoParams, MultisigPendingTxResponse, MultisigPendingTxDetailResponse, MultisigInfoResponse, MultisigPostTransactionResponse, GetMultisigAddressResponse, } from './MultiSignature';
export { AccountLedgerListParams, AccountLedgersResponse } from './AccountLedger';
export { AccountDatasetListParams, AccountDatasetsResponse, AccountDatasetResponse, SetupDatasetResponse, RemoveAccountDatasetResponse, } from './AccountDataset';
export { HostInterface } from './Network';
export { RegisterNodeInterface, registerNodeBuilder, readNodeRegistrationBytes } from './helper/transaction-builder/register-node';
export { UpdateNodeInterface, updateNodeBuilder, readUpdateNodeBytes } from './helper/transaction-builder/update-node';
export { ClaimNodeInterface, claimNodeBuilder, readClaimNodeBytes } from './helper/transaction-builder/claim-node';
export { RemoveNodeInterface, removeNodeBuilder, readRemoveNodeRegistrationBytes } from './helper/transaction-builder/remove-node';
export { EscrowApprovalInterface, escrowBuilder, readApprovalEscrowBytes } from './helper/transaction-builder/escrow-transaction';
export { SendMoneyInterface, sendMoneyBuilder, readPostTransactionBytes, readSendMoneyBytes, } from './helper/transaction-builder/send-money';
export { RemoveDatasetInterface, removeDatasetBuilder, readRemoveDatasetBytes } from './helper/transaction-builder/remove-account-dataset';
export { SetupDatasetInterface, setupDatasetBuilder, readSetupAccountDatasetBytes, } from './helper/transaction-builder/setup-account-dataset';
export { feeVoteInterface, feeVoteCommitBuilder, feeVoteRevealBuilder } from './helper/transaction-builder/fee-vote';
export { getZBCAddress, isZBCAddressValid, ZBCAddressToBytes, readInt64, shortenHash } from './helper/utils';
export { toUnconfirmedSendMoneyWallet, toUnconfirmTransactionNodeWallet, toZBCPendingTransactions } from './helper/wallet/Mempool';
export { toTransactionListWallet, toZBCTransactions, ZooTransactionsInterface, toTransactionWallet, ZooTransactionInterface, ZBCTransaction, ZBCTransactions, } from './helper/wallet/Transaction';
export { bufferToBase64, toBase64Url } from './helper/converters';
export { MultiSigInterface, signTransactionHash, MultiSigAddress, MultiSigInfo, SignatureInfo, } from './helper/transaction-builder/multisignature';
export { toGetPendingList, generateTransactionHash } from './helper/wallet/MultiSignature';
export { AccountBalanceResponse, AccountBalancesResponse } from './Account';
export { HostInfoResponse } from './Host';
export { ParticipationScoreResponse } from './ParticipationScore';
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
        getPending: (limit: number, childSeed: import("bip32").BIP32Interface) => import("rxjs").Observable<import("../grpc/model/nodeRegistration_pb").GetPendingNodeRegistrationsResponse.AsObject>;
        getMyNodePublicKey: typeof import("./Node").getMyNodePublicKey;
        getNodeTime: typeof import("./Node").getNodeTime;
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
        getBlocks: (height: number, limit?: number | undefined) => Promise<import("../grpc/model/block_pb").GetBlocksResponse.AsObject>;
        getBlockById: (id: string) => Promise<import("../grpc/model/block_pb").GetBlockResponse.AsObject>;
        getBlockByHeight: (height: number) => Promise<import("../grpc/model/block_pb").GetBlockResponse.AsObject>;
    };
    MultiSignature: {
        getPendingByTxHash: (txHash: string) => Promise<import("../grpc/model/multiSignature_pb").GetPendingTransactionDetailByTransactionHashResponse.AsObject>;
        getPendingList: (params: import("./MultiSignature").MultisigPendingListParams) => Promise<import("../grpc/model/multiSignature_pb").GetPendingTransactionsResponse.AsObject>;
        createMultiSigAddress: (multiSigAddress: import("./helper/transaction-builder/multisignature").MultiSigAddress) => string;
        generateMultiSigInfo: (multiSigAddress: import("./helper/transaction-builder/multisignature").MultiSigAddress) => Buffer;
        getMultisigInfo: (params: import("./MultiSignature").MultisigInfoParams) => Promise<import("../grpc/model/multiSignature_pb").GetMultisignatureInfoResponse.AsObject>;
        postTransaction: (data: import("./helper/transaction-builder/multisignature").MultiSigInterface, childSeed: import("bip32").BIP32Interface) => Promise<import("../grpc/model/transaction_pb").PostTransactionResponse.AsObject>;
        getMultisigAddress: (participantsAddress: string) => Promise<import("../grpc/model/multiSignature_pb").GetMultisigAddressByParticipantAddressResponse.AsObject>;
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
    NodeAddress: {
        getInfo: typeof import("./NodeAddress").getInfo;
    };
    ParticipationScore: {
        getLatest: (nodeId: string) => Promise<import("../grpc/model/participationScore_pb").ParticipationScore.AsObject>;
        getHistory: (fromHeight: number, toHeight: number) => Promise<import("../grpc/model/participationScore_pb").GetParticipationScoresResponse.AsObject>;
    };
    FeeVoting: {
        feeVoteCommit: (data: import("./helper/transaction-builder/fee-vote").feeVoteInterface, seed: import("bip32").BIP32Interface) => Promise<import("../grpc/model/transaction_pb").PostTransactionResponse.AsObject>;
        feeVoteReveal: (data: import("./helper/transaction-builder/fee-vote").feeVoteInterface, seed: import("bip32").BIP32Interface) => Promise<import("../grpc/model/transaction_pb").PostTransactionResponse.AsObject>;
    };
};
export default zoobc;
