import { GetBlocksResponse, BlockExtendedInfo } from '../grpc/model/block_pb';
import { TransportFactory } from '@improbable-eng/grpc-web/dist/typings/transports/Transport';
export interface BlockListParams {
    height: number;
    limit?: number;
    transport?: TransportFactory;
}
declare function getBlocks(params: BlockListParams): Promise<GetBlocksResponse.AsObject>;
declare function getBlockById(id: string, transport?: TransportFactory): Promise<BlockExtendedInfo.AsObject>;
declare function getBlockByHeight(height: number, transport?: TransportFactory): Promise<BlockExtendedInfo.AsObject>;
declare const _default: {
    getBlocks: typeof getBlocks;
    getBlockById: typeof getBlockById;
    getBlockByHeight: typeof getBlockByHeight;
};
export default _default;
