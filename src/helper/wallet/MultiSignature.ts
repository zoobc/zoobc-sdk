import { MultisigPendingTxResponse } from '../../MultiSignature';
import { readInt64 } from '../utils';

export function toGetPendingList(res: MultisigPendingTxResponse) {
  const list = res.pendingtransactionsList.map(tx => {
    const bytes = Buffer.from(tx.transactionbytes.toString(), 'base64');
    const amount = readInt64(bytes, 121);
    const fee = readInt64(bytes, 109);
    const timestamp = readInt64(bytes, 5);
    const recipient = bytes.slice(65, 109);
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
