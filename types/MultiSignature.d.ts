/// <reference types="node" />
export interface MultiSigAddress {
    participants: string[];
    nonce: number;
    minSigs: number;
}
export declare function createMultiSigAddressBuffer(multiSigAddress: MultiSigAddress): Buffer;
export declare function getMultiSignAddress(multiSigAddress: MultiSigAddress): string;
declare const _default: {
    createMultiSigAddressBuffer: typeof createMultiSigAddressBuffer;
    getMultiSignAddress: typeof getMultiSignAddress;
};
export default _default;
