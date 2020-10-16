/// <reference types="node" />
import { BIP32Interface } from 'bip32';
export interface feeVoteInterface {
    accountAddress: string;
    fee: number;
    recentBlockHash: string;
    recentBlockHeight: number;
    feeVote: number;
}
export declare function feeVoteCommitPhaseBuilder(data: feeVoteInterface, seed?: BIP32Interface): Buffer;
export declare function feeVoteRevealPhaseBuilder(data: feeVoteInterface, seed: BIP32Interface): Buffer;
