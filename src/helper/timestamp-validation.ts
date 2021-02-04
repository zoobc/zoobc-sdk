import { Empty } from '../../grpc/model/empty_pb';
import { NodeHardwareServiceClient } from '../../grpc/service/nodeHardware_pb_service';
import Network from '../Network';
import { readInt64 } from './utils';

export async function isTimestampValid(txBytes: Buffer): Promise<boolean> {
  const timestampPostTransactionBytes = txBytes.slice(5, 13);
  const timestampPostTransaction = readInt64(timestampPostTransactionBytes, 0);

  return new Promise((resolve, reject) => {
    // const networkIP = Network.selected();
    const request = new Empty();

    return Network.request(NodeHardwareServiceClient, 'getNodeTime', request)
      .then(res => {
        const timestampServer = res.toObject().nodetime;
        const deviation = parseInt(timestampPostTransaction) - parseInt(timestampServer);
        if (deviation < 30 && deviation > -30) resolve(true);
        else resolve(false);
      })
      .catch(err => {
        const { code, message, metadata } = err;
        reject({ code, message, metadata });
      });

    // const client = new NodeHardwareServiceClient(networkIP.host);
    // client.getNodeTime(request, (err, res) => {
    //   if (err) {
    //     const { code, message, metadata } = err;
    //     reject({ code, message, metadata });
    //   }
    //   if (res) {
    //     const timestampServer = res.toObject().nodetime;
    //     const deviation = parseInt(timestampPostTransaction) - parseInt(timestampServer);
    //     if (deviation < 30 && deviation > -30) resolve(true);
    //     else resolve(false);
    //   }
    // });
  });
}
