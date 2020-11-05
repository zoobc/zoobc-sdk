import { sha3_256 } from 'js-sha3';
import { getZBCAddress, readInt64, ZBCTransaction, ZBCTransactions } from '../..';
import { GetMempoolTransactionsResponse, MempoolTransaction } from '../../../grpc/model/mempool_pb';
import { TransactionType } from '../../../grpc/model/transaction_pb';
import { parseAddress, readAddress, readBodyBytes } from '../utils';

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

export function toZBCPendingTransactions(mempools: GetMempoolTransactionsResponse.AsObject): ZBCTransactions {
  const transactions = mempools.mempooltransactionsList.map(mempool => toZBCPendingTransaction(mempool));
  return { total: mempools.total, transactions };
}

export function toZBCPendingTransaction(mempool: MempoolTransaction.AsObject): ZBCTransaction {
  const txBytes = Buffer.from(mempool.transactionbytes.toString(), 'base64');
  let offset = 0;

  const transactionType = txBytes.readUInt32LE(offset);
  offset += 4;

  const version = txBytes.readUInt8(offset);
  offset += 1;

  const timestamp = readInt64(txBytes, offset);
  offset += 8;

  const senderBytes = readAddress(txBytes, offset);
  const sender = parseAddress(senderBytes);
  offset += senderBytes.length;

  const recipientBytes = readAddress(txBytes, offset);
  const recipient = parseAddress(recipientBytes);
  offset += recipientBytes.length;

  const txFee = readInt64(txBytes, offset);
  offset += 8;

  const bodyBytesLength = txBytes.readUInt32LE(offset);
  offset += 4;

  const txBody = readBodyBytes(txBytes, transactionType, offset);
  offset += bodyBytesLength;

  const transactionHash = Buffer.from(sha3_256(txBytes), 'hex');

  let transaction: ZBCTransaction = {
    timestamp: parseInt(timestamp) * 1000,
    sender,
    recipient,
    fee: parseInt(txFee),
    escrow: false,
    transactionType,
    transactionHash: getZBCAddress(transactionHash, 'ZTX'),
    txBody,
  };

  const approverBytes = readAddress(txBytes, offset);
  const approver = parseAddress(approverBytes);
  offset += senderBytes.length;

  if (approver.type != 2) {
    transaction.escrow = true;
    transaction.approverAddress = approver;

    transaction.commission = parseInt(readInt64(txBytes, offset));
    offset += 8;

    transaction.timeout = parseInt(readInt64(txBytes, offset));
    offset += 8;

    const instructionLength = txBytes.readInt32LE(offset);
    offset += 4;

    transaction.instruction = txBytes.slice(offset, offset + instructionLength).toString('utf-8');
    offset += instructionLength;
  }

  return transaction;
}
