import { ZBCTransaction, ZBCTransactions } from '../..';
import { GetMempoolTransactionsResponse, MempoolTransaction } from '../../../grpc/model/mempool_pb';
export declare function toUnconfirmTransactionNodeWallet(res: GetMempoolTransactionsResponse.AsObject): any;
export declare function toZBCPendingTransactions(mempools: GetMempoolTransactionsResponse.AsObject): ZBCTransactions;
export declare function toZBCPendingTransaction(mempool: MempoolTransaction.AsObject): ZBCTransaction;
