/// <reference types="node" />
import { BIP32Interface } from 'bip32';
export interface feeVoteInterface {
    accountAddress: string;
    fee: number;
    recentBlockHash: string;
    recentBlockHeight: number;
    feeVote: number;
}
export declare function feeVoteCommitBuilder(data: feeVoteInterface, seed: BIP32Interface): Buffer;
export declare function feeVoteRevealBuilder(data: feeVoteInterface, seed: BIP32Interface): Buffer;
