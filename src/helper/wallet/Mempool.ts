import { readInt64, ZBCTransaction } from '../..';
import { GetMempoolTransactionsResponse } from '../../../grpc/model/mempool_pb';
import { TransactionType } from '../../../grpc/model/transaction_pb';
import { readClaimNodeBytes } from '../transaction-builder/claim-node';
import { readApprovalEscrowBytes } from '../transaction-builder/escrow-transaction';
import { readNodeRegistrationBytes } from '../transaction-builder/register-node';
import { readRemoveDatasetBytes } from '../transaction-builder/remove-account-dataset';
import { readRemoveNodeRegistrationBytes } from '../transaction-builder/remove-node';
import { readEscrowBytes, readPostTransactionBytes, readSendMoneyBytes } from '../transaction-builder/send-money';
import { readSetupAccountDatasetBytes } from '../transaction-builder/setup-account-dataset';
import { readUpdateNodeBytes } from '../transaction-builder/update-node';

export function toUnconfirmedSendMoneyWallet(res: GetMempoolTransactionsResponse.AsObject, ownAddress: string) {
  let transactions: any = res.mempooltransactionsList.filter(tx => {
    const bytes = Buffer.from(tx.transactionbytes.toString(), 'base64');
    if (bytes.readInt32LE(0) == TransactionType.SENDMONEYTRANSACTION) return tx;
    return tx;
  });
  transactions = transactions.map((tx: any) => {
    const bytes = Buffer.from(tx.transactionbytes.toString(), 'base64');

    const amount = readInt64(bytes, 165);
    const fee = readInt64(bytes, 153);
    const friendAddress = tx.senderaccountaddress == ownAddress ? tx.recipientaccountaddress : tx.senderaccountaddress;
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
      case TransactionType.NODEREGISTRATIONTRANSACTION:
        found = true;
        result = { type: 'Register Node', tx: mempoolTx };
        break;
      case TransactionType.UPDATENODEREGISTRATIONTRANSACTION:
        found = true;
        result = { type: 'Update Node', tx: mempoolTx };
        break;
      case TransactionType.REMOVENODEREGISTRATIONTRANSACTION:
        found = true;
        result = { type: 'Remove Node', tx: mempoolTx };
        break;
      case TransactionType.CLAIMNODEREGISTRATIONTRANSACTION:
        found = true;
        result = { type: 'Claim Node', tx: mempoolTx };
        break;
    }
    if (found) break;
  }
  return result;
}

export function toZBCPendingTransactions(res: GetMempoolTransactionsResponse.AsObject): ZBCTransaction[] {
  let mempoolTx = res.mempooltransactionsList;
  let transactions: ZBCTransaction[] = [];
  let transaction: ZBCTransaction;
  for (let i = 0; i < mempoolTx.length; i++) {
    const tx = mempoolTx[i].transactionbytes;
    const txBytes = Buffer.from(tx.toString(), 'base64');
    const type = txBytes.slice(0, 4).readInt32LE(0);
    transaction = readPostTransactionBytes(txBytes);
    switch (type) {
      case TransactionType.UPDATENODEREGISTRATIONTRANSACTION:
        transaction.transactionType = TransactionType.UPDATENODEREGISTRATIONTRANSACTION;
        transaction.txBody = readUpdateNodeBytes(txBytes);
        break;
      case TransactionType.SENDMONEYTRANSACTION:
        const approverAddressLength = txBytes.slice(173, 177).readInt32LE(0);
        if (approverAddressLength > 0) transaction = readEscrowBytes(txBytes, transaction);
        transaction.transactionType = TransactionType.SENDMONEYTRANSACTION;
        transaction.txBody = readSendMoneyBytes(txBytes);
        break;
      case TransactionType.REMOVENODEREGISTRATIONTRANSACTION:
        transaction.transactionType = TransactionType.REMOVENODEREGISTRATIONTRANSACTION;
        transaction.txBody = readRemoveNodeRegistrationBytes(txBytes);
        break;
      case TransactionType.NODEREGISTRATIONTRANSACTION:
        transaction.transactionType = TransactionType.NODEREGISTRATIONTRANSACTION;
        transaction.txBody = readNodeRegistrationBytes(txBytes);
        break;
      case TransactionType.CLAIMNODEREGISTRATIONTRANSACTION:
        transaction.transactionType = TransactionType.CLAIMNODEREGISTRATIONTRANSACTION;
        transaction.txBody = readClaimNodeBytes(txBytes);
        break;
      case TransactionType.SETUPACCOUNTDATASETTRANSACTION:
        transaction.transactionType = TransactionType.SETUPACCOUNTDATASETTRANSACTION;
        transaction.txBody = readSetupAccountDatasetBytes(txBytes);
        break;
      case TransactionType.REMOVEACCOUNTDATASETTRANSACTION:
        transaction.transactionType = TransactionType.REMOVEACCOUNTDATASETTRANSACTION;
        transaction.txBody = readRemoveDatasetBytes(txBytes);
        break;
      case TransactionType.APPROVALESCROWTRANSACTION:
        transaction.transactionType = TransactionType.APPROVALESCROWTRANSACTION;
        transaction.txBody = readApprovalEscrowBytes(txBytes);
        break;
    }
    transactions.push(transaction);
  }
  return transactions;
}
