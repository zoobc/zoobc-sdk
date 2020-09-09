import { NodeHardwareServiceClient } from '../grpc/service/nodeHardware_pb_service';
import { NodeAdminServiceClient } from '../grpc/service/nodeAdmin_pb_service';
import { NodeRegistrationServiceClient } from '../grpc/service/nodeRegistration_pb_service';
import { Observable } from 'rxjs';
import { RequestType } from '../grpc/model/auth_pb';
import { BIP32Interface } from 'bip32';
import { GetNodeHardwareRequest, GetNodeHardwareResponse } from '../grpc/model/nodeHardware_pb';
import { grpc } from '@improbable-eng/grpc-web';
import { GenerateNodeKeyRequest, GenerateNodeKeyResponse } from '../grpc/model/node_pb';
import Network from './Network';
import {
  GetNodeRegistrationRequest,
  GetNodeRegistrationResponse,
  GetNodeRegistrationsResponse,
  GetNodeRegistrationsRequest,
  GetPendingNodeRegistrationsRequest,
  GetPendingNodeRegistrationsResponse,
  GetMyNodePublicKeyResponse,
} from '../grpc/model/nodeRegistration_pb';
import { RegisterNodeInterface, registerNodeBuilder } from './helper/transaction-builder/register-node';
import { UpdateNodeInterface, updateNodeBuilder } from './helper/transaction-builder/update-node';
import { RemoveNodeInterface, removeNodeBuilder } from './helper/transaction-builder/remove-node';
import { ClaimNodeInterface, claimNodeBuilder } from './helper/transaction-builder/claim-node';
import Poown from './Poown';
import { PostTransactionRequest, PostTransactionResponse } from '../grpc/model/transaction_pb';
import { TransactionServiceClient } from '../grpc/service/transaction_pb_service';
import { Pagination, OrderBy } from '../grpc/model/pagination_pb';
import { Empty } from '../grpc/model/empty_pb';

export type NodeHardwareResponse = GetNodeHardwareResponse.AsObject;
export type GenerateNodeKeyResponses = GenerateNodeKeyResponse.AsObject;
export type NodeRegistrationsResponse = GetNodeRegistrationResponse.AsObject;
export type NodePostTransactionResponse = PostTransactionResponse.AsObject;
export type GetPendingNodeRegistrationResponse = GetPendingNodeRegistrationsResponse.AsObject;
export type GetMyNodePublicKeyResponses = GetMyNodePublicKeyResponse.AsObject;

export interface NodeListParams {
  minHeight?: number;
  maxHeight?: number;
  status?: [0 | 1 | 2];
  pagination?: {
    limit?: number;
    page?: number;
    orderBy?: 0 | 1;
  };
}

export interface NodeParams {
  owner?: string;
  publicKey?: string;
  height?: number;
}

function getHardwareInfo(networkIP: string, childSeed: BIP32Interface): Observable<NodeHardwareResponse> {
  return new Observable(observer => {
    const auth = Poown.createAuth(RequestType.GETNODEHARDWARE, childSeed);
    const request = new GetNodeHardwareRequest();

    const client = new NodeHardwareServiceClient(networkIP)
      .getNodeHardware(new grpc.Metadata({ authorization: auth }))
      .write(request)
      .on('data', message => {
        observer.next(message.toObject());
      })
      .on('end', status => {
        observer.error(status);
      });
    client.end();
  });
}

function generateNodeKey(networkIP: string, childSeed: BIP32Interface): Promise<GenerateNodeKeyResponses> {
  return new Promise((resolve, reject) => {
    const auth = Poown.createAuth(RequestType.GENERATETNODEKEY, childSeed);
    const metadata = new grpc.Metadata({ authorization: auth });
    const request = new GenerateNodeKeyRequest();
    const client = new NodeAdminServiceClient(networkIP);
    client.generateNodeKey(request, metadata, (err, res) => {
      if (err) {
        const { code, message, metadata } = err;
        reject({ code, message, metadata });
      }
      if (res) resolve(res.toObject());
    });
  });
}

function getList(params?: NodeListParams): Promise<GetNodeRegistrationsResponse.AsObject> {
  return new Promise((resolve, reject) => {
    const networkIP = Network.selected();
    const request = new GetNodeRegistrationsRequest();

    if (params) {
      const { minHeight, maxHeight, status, pagination } = params;

      if (pagination) {
        const reqPagination = new Pagination();
        reqPagination.setLimit(pagination.limit || 10);
        reqPagination.setPage(pagination.page || 1);
        reqPagination.setOrderby(pagination.orderBy || OrderBy.DESC);
        request.setPagination(reqPagination);
      }

      if (maxHeight) request.setMaxregistrationheight(maxHeight);
      if (minHeight) request.setMinregistrationheight(minHeight);
      if (status) request.setRegistrationstatusesList(status);
    }

    const client = new NodeRegistrationServiceClient(networkIP.host);
    client.getNodeRegistrations(request, (err, res) => {
      if (err) {
        const { code, message, metadata } = err;
        reject({ code, message, metadata });
      }
      if (res) resolve(res.toObject());
    });
  });
}

function get(params: NodeParams): Promise<NodeRegistrationsResponse> {
  return new Promise((resolve, reject) => {
    const networkIP = Network.selected();
    const request = new GetNodeRegistrationRequest();
    if (params) {
      const { height, owner, publicKey } = params;

      if (owner) request.setAccountaddress(owner);
      if (publicKey) request.setNodepublickey(publicKey);
      if (height) request.setRegistrationheight(height);
    }

    const client = new NodeRegistrationServiceClient(networkIP.host);
    client.getNodeRegistration(request, (err, res) => {
      if (err) {
        const { code, message, metadata } = err;
        if (code == grpc.Code.NotFound) return resolve(undefined);
        else if (code != grpc.Code.OK) return reject({ code, message, metadata });
      }
      if (res) resolve(res.toObject());
    });
  });
}

function register(data: RegisterNodeInterface, childSeed: BIP32Interface): Promise<NodePostTransactionResponse> {
  return new Promise((resolve, reject) => {
    const auth = Poown.createAuth(RequestType.GETPROOFOFOWNERSHIP, childSeed);
    Poown.request(auth, data.nodeAddress).then(poown => {
      const bytes = registerNodeBuilder(data, poown, childSeed);

      const request = new PostTransactionRequest();
      request.setTransactionbytes(bytes);

      const networkIP = Network.selected();
      const client = new TransactionServiceClient(networkIP.host);
      client.postTransaction(request, (err, res) => {
        if (err) {
          const { code, message, metadata } = err;
          reject({ code, message, metadata });
        }
        if (res) resolve(res.toObject());
      });
    });
  });
}

function update(data: UpdateNodeInterface, childSeed: BIP32Interface): Promise<NodePostTransactionResponse> {
  return new Promise((resolve, reject) => {
    const auth = Poown.createAuth(RequestType.GETPROOFOFOWNERSHIP, childSeed);
    Poown.request(auth, data.nodeAddress)
      .then(poown => {
        const bytes = updateNodeBuilder(data, poown, childSeed);

        const request = new PostTransactionRequest();
        request.setTransactionbytes(bytes);

        const networkIP = Network.selected();
        const client = new TransactionServiceClient(networkIP.host);
        client.postTransaction(request, (err, res) => {
          if (err) {
            const { code, message, metadata } = err;
            reject({ code, message, metadata });
          }
          if (res) resolve(res.toObject());
        });
      })
      .catch(err => reject(err));
  });
}

function remove(data: RemoveNodeInterface, childSeed: BIP32Interface): Promise<NodePostTransactionResponse> {
  return new Promise((resolve, reject) => {
    const bytes = removeNodeBuilder(data, childSeed);

    const request = new PostTransactionRequest();
    request.setTransactionbytes(bytes);

    const networkIP = Network.selected();
    const client = new TransactionServiceClient(networkIP.host);
    client.postTransaction(request, (err, res) => {
      if (err) {
        const { code, message, metadata } = err;
        reject({ code, message, metadata });
      }
      if (res) resolve(res.toObject());
    });
  });
}

function claim(data: ClaimNodeInterface, childSeed: BIP32Interface): Promise<NodePostTransactionResponse> {
  return new Promise((resolve, reject) => {
    const auth = Poown.createAuth(RequestType.GETPROOFOFOWNERSHIP, childSeed);
    Poown.request(auth, data.nodeAddress)
      .then(poown => {
        const bytes = claimNodeBuilder(data, poown, childSeed);

        const request = new PostTransactionRequest();
        request.setTransactionbytes(bytes);

        const networkIP = Network.selected();
        const client = new TransactionServiceClient(networkIP.host);
        client.postTransaction(request, (err, res) => {
          if (err) {
            const { code, message, metadata } = err;
            reject({ code, message, metadata });
          }
          if (res) resolve(res.toObject());
        });
      })
      .catch(err => reject(err));
  });
}

function getPending(limit: number, childSeed: BIP32Interface): Observable<GetPendingNodeRegistrationResponse> {
  return new Observable(observer => {
    const auth = Poown.createAuth(RequestType.GETPENDINGNODEREGISTRATIONSSTREAM, childSeed);
    const request = new GetPendingNodeRegistrationsRequest();
    request.setLimit(limit);
    const networkIP = Network.selected();
    const client = new NodeRegistrationServiceClient(networkIP.host)
      .getPendingNodeRegistrations(new grpc.Metadata({ authorization: auth }))
      .write(request)
      .on('data', message => {
        observer.next(message.toObject());
      })
      .on('end', status => {
        observer.error(status);
      });
    client.end();
  });
}

export function getMyNodePublicKey(): Promise<GetMyNodePublicKeyResponses> {
  return new Promise((resolve, reject) => {
    const networkIP = Network.selected();
    const request = new Empty();

    const client = new NodeRegistrationServiceClient(networkIP.host);
    client.getMyNodePublicKey(request, (err, res) => {
      if (err) {
        const { code, message, metadata } = err;
        reject({ code, message, metadata });
      }
      if (res) resolve(res.toObject());
    });
  });
}

export default {
  register,
  update,
  remove,
  claim,
  getHardwareInfo,
  generateNodeKey,
  getList,
  get,
  getPending,
  getMyNodePublicKey,
};
