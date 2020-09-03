import { GetNodeAddressesInfoRequest, GetNodeAddressesInfoResponse } from '../grpc/model/nodeAddressInfo_pb';
import { NodeAddressInfoServiceClient } from '../grpc/service/nodeAddressInfo_pb_service';
import Network from './Network';

export type NodeAddressInfoResponse = GetNodeAddressesInfoResponse.AsObject;

export function getInfo(params: string[]): Promise<NodeAddressInfoResponse> {
  return new Promise((resolve, reject) => {
    const networkIP = Network.selected();
    const request = new GetNodeAddressesInfoRequest();
    request.setNodeidsList(params);
    const client = new NodeAddressInfoServiceClient(networkIP.host);
    client.getNodeAddressInfo(request, (err, res) => {
      if (err) {
        const { code, message, metadata } = err;
        reject({ code, message, metadata });
      }
      if (res) resolve(res.toObject());
    });
  });
}

export default { getInfo };
