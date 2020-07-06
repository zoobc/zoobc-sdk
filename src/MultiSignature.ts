import { writeInt32, getChecksumByte } from './helper/utils';
import { toBase64Url } from './helper/converters';
import { sha3_256 } from 'js-sha3';
import Network from './Network';
import { Pagination, OrderBy } from '../grpc/model/pagination_pb';
import {
  GetPendingTransactionsResponse,
  GetPendingTransactionsRequest,
  GetPendingTransactionDetailByTransactionHashResponse,
  GetPendingTransactionDetailByTransactionHashRequest,
  GetMultisignatureInfoResponse,
  GetMultisignatureInfoRequest,
} from '../grpc/model/multiSignature_pb';
import { MultisigServiceClient } from '../grpc/service/multiSignature_pb_service';
import { MultiSigInterface, multisignatureBuilder, MultiSigAddress } from './helper/transaction-builder/multisignature';
import { BIP32Interface } from 'bip32';
import { PostTransactionRequest, PostTransactionResponse } from '../grpc/model/transaction_pb';
import { TransactionServiceClient } from '../grpc/service/transaction_pb_service';

export type MultisigPendingTxResponse = GetPendingTransactionsResponse.AsObject;
export type MultisigPendingTxDetailResponse = GetPendingTransactionDetailByTransactionHashResponse.AsObject;
export type MultisigInfoResponse = GetMultisignatureInfoResponse.AsObject;
export type MultisigPostTransactionResponse = PostTransactionResponse.AsObject;

export interface MultisigPendingListParams {
  address?: string;
  status?: 0 | 1 | 2 | 3;
  pagination: {
    limit?: number;
    page: number;
    orderBy?: 0 | 1;
  };
}

export interface MultisigInfoParams {
  address: string;
  pagination: {
    limit?: number;
    page: number;
    orderBy?: 0 | 1;
  };
}

function generateMultiSigInfo(multiSigAddress: MultiSigAddress): Buffer {
  const { nonce, minSigs } = multiSigAddress;
  let { participants } = multiSigAddress;

  participants = participants.sort();

  const nonceB = writeInt32(nonce);
  const minSigB = writeInt32(minSigs);
  const lengthParticipants = writeInt32(participants.length);

  let participantsB = new Buffer([]);
  participants.forEach((p: string) => {
    const lengthAddress = writeInt32(p.length);
    const address = Buffer.from(p, 'utf-8');
    participantsB = Buffer.concat([participantsB, lengthAddress, address]);
  });
  return Buffer.concat([minSigB, nonceB, lengthParticipants, participantsB]);
}

function createMultiSigAddress(multiSigAddress: MultiSigAddress): string {
  const buffer = generateMultiSigInfo(multiSigAddress);
  const hashed = Buffer.from(sha3_256(buffer), 'hex');
  const checksum = Buffer.from(getChecksumByte(hashed));
  let binary = '';
  let bytes = new Buffer([]);

  bytes = Buffer.concat([hashed, checksum]);

  const len = bytes.byteLength;
  for (let i = 0; i < len; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return toBase64Url(window.btoa(binary));
}

function getPendingList(params: MultisigPendingListParams): Promise<MultisigPendingTxResponse> {
  return new Promise((resolve, reject) => {
    const request = new GetPendingTransactionsRequest();
    const networkIP = Network.selected();

    const { address, pagination, status } = params;
    if (address) request.setSenderaddress(address);
    if (status) request.setStatus(status);
    if (pagination) {
      const reqPagination = new Pagination();
      reqPagination.setLimit(pagination.limit || 10);
      reqPagination.setPage(pagination.page || 1);
      reqPagination.setOrderby(pagination.orderBy || OrderBy.DESC);
      request.setPagination(reqPagination);
    }

    const client = new MultisigServiceClient(networkIP.host);
    client.getPendingTransactions(request, (err, res) => {
      if (err) reject(err);
      if (res) resolve(res.toObject());
    });
  });
}

function getPendingByTxHash(txHash: string): Promise<MultisigPendingTxDetailResponse> {
  return new Promise((resolve, reject) => {
    const request = new GetPendingTransactionDetailByTransactionHashRequest();
    const networkIP = Network.selected();

    request.setTransactionhashhex(txHash);
    const client = new MultisigServiceClient(networkIP.host);
    client.getPendingTransactionDetailByTransactionHash(request, (err, res) => {
      if (err) reject(err);
      if (res) resolve(res.toObject());
    });
  });
}

function getMultisigInfo(params: MultisigInfoParams): Promise<MultisigInfoResponse> {
  return new Promise((resolve, reject) => {
    const request = new GetMultisignatureInfoRequest();
    const networkIP = Network.selected();

    const { address, pagination } = params;
    request.setMultisigaddress(address);
    if (pagination) {
      const reqPagination = new Pagination();
      reqPagination.setLimit(pagination.limit || 10);
      reqPagination.setPage(pagination.page || 1);
      reqPagination.setOrderby(pagination.orderBy || OrderBy.DESC);
      request.setPagination(reqPagination);
    }

    const client = new MultisigServiceClient(networkIP.host);
    client.getMultisignatureInfo(request, (err, res) => {
      if (err) reject(err);
      if (res) resolve(res.toObject());
    });
  });
}

function postTransaction(data: MultiSigInterface, childSeed: BIP32Interface): Promise<PostTransactionResponse.AsObject> {
  return new Promise((resolve, reject) => {
    const bytes = multisignatureBuilder(data, childSeed);

    const request = new PostTransactionRequest();
    request.setTransactionbytes(bytes);

    const networkIP = Network.selected();
    const client = new TransactionServiceClient(networkIP.host);
    client.postTransaction(request, (err, res) => {
      if (err) reject(err);
      if (res) resolve(res.toObject());
    });
  });
}

export default { getPendingByTxHash, getPendingList, createMultiSigAddress, generateMultiSigInfo, getMultisigInfo, postTransaction };
