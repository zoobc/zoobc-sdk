import { GetBlocksResponse, BlockExtendedInfo } from '../grpc/model/block_pb';
export interface BlockListParams {
    height: number;
    limit?: number;
}
declare function getBlocks(params: BlockListParams): Promise<GetBlocksResponse.AsObject>;
declare function getBlockById(id: string): Promise<BlockExtendedInfo.AsObject>;
declare function getBlockByHeight(height: number): Promise<BlockExtendedInfo.AsObject>;
declare const _default: {
    getBlocks: typeof getBlocks;
    getBlockById: typeof getBlockById;
    getBlockByHeight: typeof getBlockByHeight;
};
export default _default;
