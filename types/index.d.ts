/// <reference types="node" />
export { ZooKeyring } from './Keyring';
export { Ledger } from './Ledger';
export { BIP32Interface } from 'bip32';
export { Subscription } from 'rxjs';
export { EscrowListParams, ApprovalEscrowTransactionResponse } from './Escrows';
export { NodeListParams, NodeParams, NodeHardwareResponse, GenerateNodeKeyResponses, NodePostTransactionResponse, GetPendingNodeRegistrationResponse, GetMyNodePublicKeyResponses, GetNodeTimeResponses, } from './Node';
export { MempoolListParams } from './Mempool';
export { TransactionListParams, PostTransactionResponses, TransactionMinimumFeeResponse } from './Transactions';
export { BlocksResponse, BlockResponse } from './Block';
export { MultisigPendingListParams, MultisigInfoParams, MultisigPendingTxResponse, MultisigPendingTxDetailResponse, MultisigInfoResponse, MultisigPostTransactionResponse, GetMultisigAddressResponse, } from './MultiSignature';
export { AccountLedgerListParams } from './AccountLedger';
export { AccountDatasetListParams, SetupDatasetResponse, RemoveAccountDatasetResponse } from './AccountDataset';
export { AccountBalance } from './Account';
export { HostInfoResponse } from './Host';
export { ParticipationScoreResponse } from './ParticipationScore';
export { HostInterface } from './Network';
export { RegisterNodeInterface, registerNodeBuilder } from './helper/transaction-builder/register-node';
export { UpdateNodeInterface, updateNodeBuilder, readUpdateNodeBytes } from './helper/transaction-builder/update-node';
export { ClaimNodeInterface, claimNodeBuilder, readClaimNodeBytes } from './helper/transaction-builder/claim-node';
export { RemoveNodeInterface, removeNodeBuilder } from './helper/transaction-builder/remove-node';
export { EscrowApprovalInterface, escrowBuilder, readApprovalEscrowBytes } from './helper/transaction-builder/escrow-transaction';
export { SendMoneyInterface, sendMoneyBuilder, readSendMoneyBytes } from './helper/transaction-builder/send-money';
export { RemoveDatasetInterface, removeDatasetBuilder, readRemoveDatasetBytes } from './helper/transaction-builder/remove-account-dataset';
export { SetupDatasetInterface, setupDatasetBuilder } from './helper/transaction-builder/setup-account-dataset';
export { feeVoteInterface, feeVoteCommitBuilder, feeVoteRevealBuilder } from './helper/transaction-builder/fee-vote';
export { getZBCAddress, isZBCAddressValid, ZBCAddressToBytes, readInt64, shortenHash, parseAddress, addressToBytes } from './helper/utils';
export { bufferToBase64, toBase64Url } from './helper/converters';
export { MultiSigInterface, signTransactionHash, MultiSigInfo, SignatureInfo } from './helper/transaction-builder/multisignature';
export { Address } from './helper/interfaces';
export { AccountDatasetProperty } from '../grpc/model/accountDataset_pb';
export { EscrowStatus, EscrowApproval } from '../grpc/model/escrow_pb';
export { EventType } from '../grpc/model/event_pb';
export { PendingTransactionStatus } from '../grpc/model/multiSignature_pb';
export { NodeRegistrationState } from '../grpc/model/nodeRegistration_pb';
export { OrderBy } from '../grpc/model/pagination_pb';
export { TransactionType } from '../grpc/model/transaction_pb';
export { RequestType } from '../grpc/model/auth_pb';
export { ZBCTransaction, ZBCTransactions } from './helper/wallet/Transaction';
export { toGetPendingList, toGetPending, toGetPendingDetail, generateTransactionHash, MultiSigPendingDetailResponse, } from './helper/wallet/MultiSignature';
export { AccountDataset, AccountDatasets } from './helper/wallet/AccountDataset';
export { AccountLedger, AccountLedgerList } from './helper/wallet/AccountLedger';
export { Escrow, Escrows } from './helper/wallet/Escrows';
export { NodeRegistrations, NodeRegistration } from './helper/wallet/Node';
declare const zoobc: {
    Transactions: {
        sendMoney: (data: import("./helper/transaction-builder/send-money").SendMoneyInterface, seed: import("bip32").BIP32Interface) => Promise<import("../grpc/model/transaction_pb").PostTransactionResponse.AsObject>;
        get: (id: string) => Promise<import("./helper/wallet/Transaction").ZBCTransaction>;
        getList: (params?: import("./Transactions").TransactionListParams | undefined) => Promise<import("./helper/wallet/Transaction").ZBCTransactions>;
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
        getBalance: (address: import("./helper/interfaces").Address) => Promise<import("./Account").AccountBalance>;
        getBalances: (addresses: import("./helper/interfaces").Address[]) => Promise<import("./Account").AccountBalance[]>;
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
        getList: (params?: import("./Node").NodeListParams | undefined) => Promise<import("./helper/wallet/Node").NodeRegistrations>;
        get: (params: import("./Node").NodeParams) => Promise<import("./helper/wallet/Node").NodeRegistration>;
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
        get: (id: string) => Promise<import("./helper/wallet/Escrows").Escrow>;
        getList: (params?: import("./Escrows").EscrowListParams | undefined) => Promise<import("./helper/wallet/Escrows").Escrows>;
    };
    Mempool: {
        get: (id: string) => Promise<import("./helper/wallet/Transaction").ZBCTransaction>;
        getList: (params?: import("./Mempool").MempoolListParams | undefined) => Promise<import("./helper/wallet/Transaction").ZBCTransactions>;
    };
    Block: {
        getBlocks: (height: number, limit?: number | undefined) => Promise<import("../grpc/model/block_pb").GetBlocksResponse.AsObject>;
        getBlockById: (id: string) => Promise<import("../grpc/model/block_pb").GetBlockResponse.AsObject>;
        getBlockByHeight: (height: number) => Promise<import("../grpc/model/block_pb").GetBlockResponse.AsObject>;
    };
    MultiSignature: {
        getPendingByTxHash: (txHash: string) => Promise<import("./helper/wallet/MultiSignature").MultiSigPendingDetailResponse>;
        getPendingList: (params: import("./MultiSignature").MultisigPendingListParams) => Promise<import("./helper/wallet/Transaction").ZBCTransactions>;
        createMultiSigAddress: (multiSigAddress: import("./helper/transaction-builder/multisignature").MultiSigInfo) => string;
        generateMultiSigInfo: (multiSigAddress: import("./helper/transaction-builder/multisignature").MultiSigInfo) => Buffer;
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
