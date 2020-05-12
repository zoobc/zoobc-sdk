import { HostInfo } from '../grpc/model/host_pb';
declare function getInfo(): Promise<HostInfo.AsObject>;
declare const _default: {
    getInfo: typeof getInfo;
};
export default _default;
