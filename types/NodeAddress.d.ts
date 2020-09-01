import { GetNodeAddressesInfoResponse } from '../grpc/model/nodeAddressInfo_pb';
export declare type NodeAddressInfoResponse = GetNodeAddressesInfoResponse.AsObject;
export interface NodeAddressInfoParam {
    nodeIdsList: string[];
}
export declare function getInfo(params?: NodeAddressInfoParam): Promise<NodeAddressInfoResponse>;
declare const _default: {
    getInfo: typeof getInfo;
};
export default _default;
