import { readInt64 } from '../..';
import { GetMempoolTransactionsResponse } from '../../../grpc/model/mempool_pb';
import { TransactionType } from '../../../grpc/model/transaction_pb';
import { readClaimNodeBytes } from '../transaction-builder/claim-node';
import { readApprovalEscrowBytes } from '../transaction-builder/escrow-transaction';
import { readMultisignatureTransactionBytes } from '../transaction-builder/multisignature';
import { readNodeRegistrationBytes } from '../transaction-builder/register-node';
import { readRemoveDatasetBytes } from '../transaction-builder/remove-account-dataset';
import { readRemoveNodeRegistrationBytes } from '../transaction-builder/remove-node';
import { readPostTransactionBytes, readSendMoneyBytes, readSendMoneyEscrowBytes } from '../transaction-builder/send-money';
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

export function toZBCPendingTransactions(res: GetMempoolTransactionsResponse.AsObject) {
  let mempoolTx = res.mempooltransactionsList;
  let result: any = [];
  let bytesConverted: any = [];
  for (let i = 0; i < mempoolTx.length; i++) {
    const tx = mempoolTx[i].transactionbytes;
    const txBytes = Buffer.from(tx.toString(), 'base64');
    const type = txBytes.slice(0, 4).readInt32LE(0);
    bytesConverted = readPostTransactionBytes(txBytes);
    switch (type) {
      case TransactionType.UPDATENODEREGISTRATIONTRANSACTION:
        bytesConverted = readUpdateNodeBytes(txBytes, bytesConverted);
        result.push({ type: 'Update Node', tx: bytesConverted });
        break;
      case TransactionType.SENDMONEYTRANSACTION:
        bytesConverted = readSendMoneyBytes(txBytes, bytesConverted);
        if (txBytes.length > 269) {
          bytesConverted = readSendMoneyEscrowBytes(txBytes, bytesConverted);
          result.push({ type: 'Send Money', tx: bytesConverted });
          break;
        } else {
          result.push({ type: 'Send Money', tx: bytesConverted });
          break;
        }
      case TransactionType.REMOVENODEREGISTRATIONTRANSACTION:
        bytesConverted = readRemoveNodeRegistrationBytes(txBytes, bytesConverted);
        result.push({ type: 'Remove Node', tx: bytesConverted });
        break;
      case TransactionType.NODEREGISTRATIONTRANSACTION:
        bytesConverted = readNodeRegistrationBytes(txBytes, bytesConverted);
        result.push({ type: 'Node Registration', tx: bytesConverted });
        break;
      case TransactionType.CLAIMNODEREGISTRATIONTRANSACTION:
        bytesConverted = readClaimNodeBytes(txBytes, bytesConverted);
        result.push({ type: 'Claim Node', tx: bytesConverted });
        break;
      case TransactionType.SETUPACCOUNTDATASETTRANSACTION:
        bytesConverted = readSetupAccountDatasetBytes(txBytes, bytesConverted);
        result.push({ type: 'Setup Account Dataset', tx: bytesConverted });
        break;
      case TransactionType.REMOVEACCOUNTDATASETTRANSACTION:
        bytesConverted = readRemoveDatasetBytes(txBytes, bytesConverted);
        result.push({ type: 'Remove Account Dataset', tx: bytesConverted });
        break;
      case TransactionType.APPROVALESCROWTRANSACTION:
        bytesConverted = readApprovalEscrowBytes(txBytes, bytesConverted);
        result.push({ type: 'Approval Escrow Transaction', tx: bytesConverted });
        break;
      case TransactionType.MULTISIGNATURETRANSACTION:
        bytesConverted = readMultisignatureTransactionBytes(txBytes, bytesConverted);
        result.push({ type: 'Multisignature Transaction', tx: bytesConverted });
        break;
    }
  }
  return {
    total: res.total,
    mempoolTx: result,
  };
}
