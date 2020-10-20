import { ZBCTransaction } from '../..';
import { GetMempoolTransactionsResponse } from '../../../grpc/model/mempool_pb';
export declare function toUnconfirmedSendMoneyWallet(res: GetMempoolTransactionsResponse.AsObject, ownAddress: string): any;
export declare function toUnconfirmTransactionNodeWallet(res: GetMempoolTransactionsResponse.AsObject): any;
export declare function toZBCPendingTransactions(res: GetMempoolTransactionsResponse.AsObject): ZBCTransaction[];
