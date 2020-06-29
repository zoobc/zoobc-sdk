import { GetBlocksResponse, BlockExtendedInfo } from '../grpc/model/block_pb';
export declare type BlocksResponse = GetBlocksResponse.AsObject;
export declare type BlockResponse = BlockExtendedInfo.AsObject;
export interface BlockListParams {
    height: number;
    limit?: number;
}
declare function getBlocks(params: BlockListParams): Promise<BlocksResponse>;
declare function getBlockById(id: string): Promise<BlockResponse>;
declare function getBlockByHeight(height: number): Promise<BlockResponse>;
declare const _default: {
    getBlocks: typeof getBlocks;
    getBlockById: typeof getBlockById;
    getBlockByHeight: typeof getBlockByHeight;
};
export default _default;
