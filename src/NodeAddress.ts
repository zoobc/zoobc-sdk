// Licensed to the Quasisoft Limited - Hong Kong under one or more agreements
// The Quasisoft Limited - Hong Kong licenses this file to you under MIT license.

import { GetNodeAddressesInfoRequest, GetNodeAddressesInfoResponse } from '../grpc/model/nodeAddressInfo_pb';
import { NodeAddressInfoServiceClient } from '../grpc/service/nodeAddressInfo_pb_service';
import Network from './Network';

export type NodeAddressInfoResponse = GetNodeAddressesInfoResponse.AsObject;

export function getInfo(nodeidsList: string[]): Promise<NodeAddressInfoResponse> {
  return new Promise((resolve, reject) => {
    // const networkIP = Network.selected();
    const request = new GetNodeAddressesInfoRequest();
    request.setNodeidsList(nodeidsList);

    Network.request(NodeAddressInfoServiceClient, 'getNodeAddressInfo', request)
      .catch(err => {
        const { code, message, metadata } = err;
        reject({ code, message, metadata });
      })
      .then(res => {
        resolve(res.toObject());
      });

    /*const client = new NodeAddressInfoServiceClient(networkIP.host);
    client.getNodeAddressInfo(request, (err, res) => {
      if (err) {
        const { code, message, metadata } = err;
        reject({ code, message, metadata });
      }
      if (res) resolve(res.toObject());
    });*/
  });
}

export default { getInfo };
