import { GetNodeRegistrationsResponse, NodeRegistration as NodeResponse } from '../../../grpc/model/nodeRegistration_pb';
import { Account } from '../interfaces';
export interface NodeRegistration {
    nodeId: string;
    nodePublicKey: string;
    accountAddress: Account;
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
export declare function toZBCNodeRegistration(node: NodeResponse.AsObject): NodeRegistration;
export declare function toZBCNodeRegistrations(nodes: GetNodeRegistrationsResponse.AsObject): NodeRegistrations;
