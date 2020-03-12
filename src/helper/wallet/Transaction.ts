import { readInt64 } from '../utils';
import { GetTransactionsResponse } from '../../../grpc/model/transaction_pb';

export interface ZooTransactionsInterface {
  total: number;
  transactions: {
    id: string;
    address: string;
    timestamp: number;
    fee: number;
    type: string;
    amount: number;
    blockId: string;
    height: number;
    transactionIndex: number;
  }[];
}

export function toTransactionListWallet(res: GetTransactionsResponse.AsObject, ownAddress: string): ZooTransactionsInterface {
  let transactionList = res.transactionsList.map(tx => {
    const bytes = Buffer.from(tx.transactionbodybytes.toString(), 'base64');
    const amount = readInt64(bytes, 0);
    const friendAddress = tx.senderaccountaddress == ownAddress ? tx.recipientaccountaddress : tx.senderaccountaddress;
    const type = tx.senderaccountaddress == ownAddress ? 'send' : 'receive';
    return {
      id: tx.id,
      address: friendAddress,
      type: type,
      timestamp: parseInt(tx.timestamp) * 1000,
      fee: parseInt(tx.fee),
      amount: amount,
      blockId: tx.blockid,
      height: tx.height,
      transactionIndex: tx.transactionindex,
    };
  });
  return {
    total: parseInt(res.total),
    transactions: transactionList,
  };
}
