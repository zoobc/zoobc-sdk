import { readInt64 } from '../utils';
import { GetMempoolTransactionsResponse } from '../../../grpc/model/mempool_pb';
import { TransactionTypeMap } from '../../../grpc/model/transaction_pb';

let typeTransactions: TransactionTypeMap;

export function toUnconfirmedSendMoneyWallet(
  res: GetMempoolTransactionsResponse.AsObject,
  ownAddress: string,
) {
  let transactions: any = res.mempooltransactionsList.filter(tx => {
    const bytes = Buffer.from(tx.transactionbytes.toString(), 'base64');
    if (bytes.readInt32LE(0) == typeTransactions.SENDMONEYTRANSACTION) return tx;
  });
  transactions = transactions.map((tx: any) => {
    const bytes = Buffer.from(tx.transactionbytes.toString(), 'base64');

    const amount = readInt64(bytes, 121);
    const fee = readInt64(bytes, 109);
    const friendAddress =
      tx.senderaccountaddress == ownAddress ? tx.recipientaccountaddress : tx.senderaccountaddress;
    const type = tx.senderaccountaddress == ownAddress ? 'send' : 'receive';

    return {
      address: friendAddress,
      type: type,
      timestamp: parseInt(tx.arrivaltimestamp) * 1000,
      fee: fee,
      amount: amount,
    };
  });
  return transactions;
}

export function toUnconfirmTransactionNodeWallet(res: GetMempoolTransactionsResponse.AsObject) {
  let mempoolTx = res.mempooltransactionsList;
  let result: any = null;
  for (let i = 0; i < mempoolTx.length; i++) {
    const tx = mempoolTx[i].transactionbytes;
    const txBytes = Buffer.from(tx.toString(), 'base64');
    const type = txBytes.slice(0, 4).readInt32LE(0);

    let found = false;
    switch (type) {
      case typeTransactions.NODEREGISTRATIONTRANSACTION:
        found = true;
        result = { type: 'Register Node', tx: mempoolTx };
        break;
      case typeTransactions.UPDATENODEREGISTRATIONTRANSACTION:
        found = true;
        result = { type: 'Update Node', tx: mempoolTx };
        break;
      case typeTransactions.REMOVENODEREGISTRATIONTRANSACTION:
        found = true;
        result = { type: 'Remove Node', tx: mempoolTx };
        break;
      case typeTransactions.CLAIMNODEREGISTRATIONTRANSACTION:
        found = true;
        result = { type: 'Claim Node', tx: mempoolTx };
        break;
    }
    if (found) break;
  }
  return result;
}
