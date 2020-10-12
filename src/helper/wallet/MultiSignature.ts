import { MultisigPendingTxResponse } from '../../MultiSignature';
import { getZBCAddress, readInt64 } from '../utils';
import { sha3_256 } from 'js-sha3';

export function toGetPendingList(res: MultisigPendingTxResponse) {
  const list = res.pendingtransactionsList.map(tx => {
    const bytes = Buffer.from(tx.transactionbytes.toString(), 'base64');
    const amount = readInt64(bytes, 165);
    const fee = readInt64(bytes, 153);
    const timestamp = readInt64(bytes, 5);
    const recipient = bytes.slice(87, 153);
    return {
      amount: amount,
      blockheight: tx.blockheight,
      fee: fee,
      latest: tx.latest,
      senderaddress: tx.senderaddress,
      recipientaddress: recipient.toString(),
      status: tx.status,
      timestamp: timestamp,
      transactionhash: tx.transactionhash,
    };
  });
  return {
    count: res.count,
    page: res.page,
    pendingtransactionsList: list,
  };
}

export function generateTransactionHash(buffer: Buffer): string {
  const hashed = Buffer.from(sha3_256(buffer), 'hex');
  return getZBCAddress(hashed, 'ZTX');
}
