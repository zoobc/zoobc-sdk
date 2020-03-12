import { GetBlocksResponse, BlockExtendedInfo } from '../grpc/model/block_pb';
declare function getBlocks(height: number, limit?: number): Promise<GetBlocksResponse.AsObject>;
declare function getBlockById(id: string): Promise<BlockExtendedInfo.AsObject>;
declare function getBlockByHeight(height: number): Promise<BlockExtendedInfo.AsObject>;
declare const _default: {
    getBlocks: typeof getBlocks;
    getBlockById: typeof getBlockById;
    getBlockByHeight: typeof getBlockByHeight;
};
export default _default;
