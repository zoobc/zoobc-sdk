import Network from './Network';
import { HostServiceClient } from '../grpc/service/host_pb_service';
import { Empty } from '../grpc/model/empty_pb';
import { HostInfo } from '../grpc/model/host_pb';

export type HostInfoResponse = HostInfo.AsObject;

function getInfo(): Promise<HostInfoResponse> {
  return new Promise((resolve, reject) => {
    const networkIP = Network.selected();
    const request = new Empty();

    const client = new HostServiceClient(networkIP.host);
    client.getHostInfo(request, (err, res) => {
      if (err) reject(err.message);
      if (res) resolve(res.toObject());
    });
  });
}

export default { getInfo };
