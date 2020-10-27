/// <reference types="node" />
import { BIP32Interface } from 'bip32';
import { EscrowTransactionInterface } from './send-money';
import { Account } from '../interfaces';
export interface feeVoteInterface extends EscrowTransactionInterface {
    accountAddress: Account;
    fee: number;
    recentBlockHash: string;
    recentBlockHeight: number;
    feeVote: number;
}
export declare function feeVoteCommitBuilder(data: feeVoteInterface, seed: BIP32Interface): Buffer;
export declare function feeVoteRevealBuilder(data: feeVoteInterface, seed: BIP32Interface): Buffer;
