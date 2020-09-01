import { GetNodeAddressesInfoRequest, GetNodeAddressesInfoResponse } from '../grpc/model/nodeAddressInfo_pb';
import { NodeAddressInfoServiceClient } from '../grpc/service/nodeAddressInfo_pb_service';
import Network from './Network';

export type NodeAddressInfoResponse = GetNodeAddressesInfoResponse.AsObject;

export interface NodeAddressInfoParam {
  nodeIdsList: string[];
}

export function getInfo(params?: NodeAddressInfoParam): Promise<GetNodeAddressesInfoResponse> {
  return new Promise((resolve, reject) => {
    const networkIP = Network.selected();
    const request = new GetNodeAddressesInfoRequest();
    if (params) {
      const { nodeIdsList } = params;
      if (nodeIdsList) request.setNodeidsList(nodeIdsList);
    }
    const client = new NodeAddressInfoServiceClient(networkIP.host);
    client.getNodeAddressInfo(request, (err, res) => {
      if (err) {
        const { code, message, metadata } = err;
        reject({ code, message, metadata });
      }
      if (res) resolve(res);
    });
  });
}

export default { getInfo };
