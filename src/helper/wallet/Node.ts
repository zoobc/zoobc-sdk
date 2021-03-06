// Licensed to the Quasisoft Limited - Hong Kong under one or more agreements
// The Quasisoft Limited - Hong Kong licenses this file to you under MIT license.

import { GetNodeRegistrationsResponse, NodeRegistration as NodeResponse } from '../../../grpc/model/nodeRegistration_pb';
import { Address } from '../interfaces';
import { getZBCAddress, parseAddress } from '../utils';

export interface NodeRegistration {
  nodeId: string;
  nodePublicKey: string;
  accountAddress: Address;
  registrationHeight: number;
  lockedBalance: string;
  registrationStatus: number;
  latest: boolean;
  height: number;
}

export interface NodeRegistrations {
  total: number;
  nodeList: NodeRegistration[] | any;
}

export function toZBCNodeRegistration(node: NodeResponse.AsObject): NodeRegistration {
  return {
    nodeId: node.nodeid,
    nodePublicKey: getZBCAddress(Buffer.from(node.nodepublickey.toString(), 'base64'), 'ZNK'),
    accountAddress: parseAddress(node.accountaddress),
    registrationHeight: node.registrationheight,
    lockedBalance: node.lockedbalance,
    registrationStatus: node.registrationstatus,
    latest: node.latest,
    height: node.height,
  };
}

export function toZBCNodeRegistrations(nodes: GetNodeRegistrationsResponse.AsObject): NodeRegistrations {
  const list = nodes.noderegistrationsList.map(node => toZBCNodeRegistration(node));
  return {
    total: parseInt(nodes.total),
    nodeList: list,
  };
}
