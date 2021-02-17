// Licensed to the Quasisoft Limited - Hong Kong under one or more agreements
// The Quasisoft Limited - Hong Kong licenses this file to you under MIT license.

import Network from './Network';
import { HostServiceClient } from '../grpc/service/host_pb_service';
import { Empty } from '../grpc/model/empty_pb';
import { HostInfo } from '../grpc/model/host_pb';

export type HostInfoResponse = HostInfo.AsObject;

function getInfo(): Promise<HostInfoResponse> {
  return new Promise((resolve, reject) => {
    // const networkIP = Network.selected();
    const request = new Empty();

    Network.request(HostServiceClient, 'getHostInfo', request, true)
      .catch(err => {
        const { code, message, metadata } = err;
        reject({ code, message, metadata });
      })
      .then(res => {
        if (res) resolve(res.toObject());
      });

    /*const client = new HostServiceClient(networkIP.host);
    client.getHostInfo(request, (err, res) => {
      if (err) {
        const { code, message, metadata } = err;
        reject({ code, message, metadata });
      }
      if (res) resolve(res.toObject());
    });*/
  });
}

export default { getInfo };
