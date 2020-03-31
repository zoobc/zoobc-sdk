/// <reference types="node" />
import { BIP32Interface } from 'bip32';
declare function createAuth(requestType: number, seed: BIP32Interface): string;
declare function request(auth: string, networkIp: string): Promise<Buffer>;
declare const _default: {
    request: typeof request;
    createAuth: typeof createAuth;
};
export default _default;
