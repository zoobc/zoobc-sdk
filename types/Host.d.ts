import { HostInfo } from '../grpc/model/host_pb';
export declare type HostInfoResponse = HostInfo.AsObject;
declare function getInfo(): Promise<HostInfoResponse>;
declare const _default: {
    getInfo: typeof getInfo;
};
export default _default;
