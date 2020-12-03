import { BIP32Interface, PostTransactionResponses } from '.';
import { PostTransactionRequest } from '../grpc/model/transaction_pb';
import { TransactionServiceClient } from '../grpc/service/transaction_pb_service';
import {
  LiquidPayment,
  liquidPaymentBuilder,
  LiquidPaymentStop,
  liquidPaymentStopBuilder,
} from './helper/transaction-builder/liquid-payment';
import { errorDateMessage, validationTimestamp } from './helper/utils';
import Network from './Network';

function LiquidPayment(data: LiquidPayment, seed: BIP32Interface): Promise<PostTransactionResponses> {
  const txBytes = liquidPaymentBuilder(data, seed);

  return new Promise(async (resolve, reject) => {
    const networkIP = Network.selected();

    const request = new PostTransactionRequest();
    request.setTransactionbytes(txBytes);
    const validTimestamp = await validationTimestamp(txBytes);
    if (validTimestamp) {
      const client = new TransactionServiceClient(networkIP.host);
      client.postTransaction(request, (err, res) => {
        if (err) {
          const { code, message, metadata } = err;
          reject({ code, message, metadata });
        }
        if (res) resolve(res.toObject());
      });
    } else {
      const { code, message, metadata } = errorDateMessage;
      reject({ code, message, metadata });
    }
  });
}

function LiquidPaymentStop(data: LiquidPaymentStop, seed: BIP32Interface): Promise<PostTransactionResponses> {
  const txBytes = liquidPaymentStopBuilder(data, seed);

  return new Promise(async (resolve, reject) => {
    const networkIP = Network.selected();

    const request = new PostTransactionRequest();
    request.setTransactionbytes(txBytes);
    const validTimestamp = await validationTimestamp(txBytes);
    if (validTimestamp) {
      const client = new TransactionServiceClient(networkIP.host);
      client.postTransaction(request, (err, res) => {
        if (err) {
          const { code, message, metadata } = err;
          reject({ code, message, metadata });
        }
        if (res) resolve(res.toObject());
      });
    } else {
      const { code, message, metadata } = errorDateMessage;
      reject({ code, message, metadata });
    }
  });
}

export default { LiquidPayment, LiquidPaymentStop };
