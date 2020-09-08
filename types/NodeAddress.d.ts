import { GetNodeAddressesInfoResponse } from '../grpc/model/nodeAddressInfo_pb';
export declare type NodeAddressInfoResponse = GetNodeAddressesInfoResponse.AsObject;
export declare function getInfo(nodeidsList: string[]): Promise<NodeAddressInfoResponse>;
declare const _default: {
    getInfo: typeof getInfo;
};
export default _default;
