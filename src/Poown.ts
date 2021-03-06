// Licensed to the Quasisoft Limited - Hong Kong under one or more agreements
// The Quasisoft Limited - Hong Kong licenses this file to you under MIT license.

import { BIP32Interface } from 'bip32';
import { writeInt64, writeInt32 } from './helper/utils';
import { GetProofOfOwnershipRequest } from '../grpc/model/proofOfOwnership_pb';
import { NodeAdminServiceClient } from '../grpc/service/nodeAdmin_pb_service';
import { grpc } from '@improbable-eng/grpc-web';

function createAuth(requestType: number, seed: BIP32Interface): string {
  let bytes: Buffer;

  const timestamp = writeInt64(Date.now());
  const requestTypeBytes = writeInt32(requestType);
  bytes = Buffer.concat([timestamp, requestTypeBytes]);

  const signature = seed.sign(bytes);
  return Buffer.concat([bytes, signature]).toString('base64');
}

function request(auth: string, networkIp: string): Promise<Buffer> {
  return new Promise((resolve, reject) => {
    const request = new GetProofOfOwnershipRequest();
    const metadata = new grpc.Metadata({ authorization: auth });

    const client = new NodeAdminServiceClient(networkIp);

    client.getProofOfOwnership(request, metadata, (err, res) => {
      if (err) {
        const { code, message, metadata } = err;
        reject({ code, message, metadata });
      }
      if (res) {
        const bytes = Buffer.concat([
          Buffer.from(res.toObject().messagebytes.toString(), 'base64'),
          Buffer.from(res.toObject().signature.toString(), 'base64'),
        ]);
        resolve(bytes);
      }
    });
  });
}

export default { request, createAuth };
