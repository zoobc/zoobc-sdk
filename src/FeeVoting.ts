import { feeVoteInterface, BIP32Interface, PostTransactionResponses, feeVoteCommitBuilder, feeVoteRevealBuilder } from '.';
import { PostTransactionRequest } from '../grpc/model/transaction_pb';
import { TransactionServiceClient } from '../grpc/service/transaction_pb_service';
import { validationTimestamp, errorDateMessage } from './helper/utils';
import Network from './Network';

function feeVoteCommit(data: feeVoteInterface, seed: BIP32Interface): Promise<PostTransactionResponses> {
  const txBytes = feeVoteCommitBuilder(data, seed);

  return new Promise(async (resolve, reject) => {
    // const networkIP = Network.selected();

    const request = new PostTransactionRequest();
    request.setTransactionbytes(txBytes);
    const validTimestamp = await validationTimestamp(txBytes);
    if (validTimestamp) {
      Network.request(TransactionServiceClient, 'postTransaction', request)
        .catch(err => {
          const { code, message, metadata } = err;
          reject({ code, message, metadata });
        })
        .then(res => {
          resolve(res.toObject());
        });

      /*const client = new TransactionServiceClient(networkIP.host);
      client.postTransaction(request, (err, res) => {
        if (err) {
          const { code, message, metadata } = err;
          reject({ code, message, metadata });
        }
        if (res) resolve(res.toObject());
      });*/
    } else {
      const { code, message, metadata } = errorDateMessage;
      reject({ code, message, metadata });
    }
  });
}

function feeVoteReveal(data: feeVoteInterface, seed: BIP32Interface): Promise<PostTransactionResponses> {
  const txBytes = feeVoteRevealBuilder(data, seed);

  return new Promise(async (resolve, reject) => {
    // const networkIP = Network.selected();

    const request = new PostTransactionRequest();
    request.setTransactionbytes(txBytes);
    const validTimestamp = await validationTimestamp(txBytes);
    if (validTimestamp) {
      Network.request(TransactionServiceClient, 'postTransaction', request)
        .catch(err => {
          const { code, message, metadata } = err;
          reject({ code, message, metadata });
        })
        .then(res => {
          resolve(res.toObject());
        });

      /*const client = new TransactionServiceClient(networkIP.host);
      client.postTransaction(request, (err, res) => {
        if (err) {
          const { code, message, metadata } = err;
          reject({ code, message, metadata });
        }
        if (res) resolve(res.toObject());
      });*/
    } else {
      const { code, message, metadata } = errorDateMessage;
      reject({ code, message, metadata });
    }
  });
}

export default { feeVoteCommit, feeVoteReveal };
