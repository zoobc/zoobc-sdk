import { feeVoteInterface, BIP32Interface, PostTransactionResponses } from '.';
declare function feeVoteCommit(data: feeVoteInterface, seed: BIP32Interface): Promise<PostTransactionResponses>;
declare function feeVoteReveal(data: feeVoteInterface, seed: BIP32Interface): Promise<PostTransactionResponses>;
declare const _default: {
    feeVoteCommit: typeof feeVoteCommit;
    feeVoteReveal: typeof feeVoteReveal;
};
export default _default;
