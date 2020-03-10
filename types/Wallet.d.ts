export declare function encryptPassphrase(seed: string, password: string, salt?: string): string;
export declare function decryptPassphrase(encSeed: string, password: string, salt?: string): string;
declare const _default: {
    encryptPassphrase: typeof encryptPassphrase;
    decryptPassphrase: typeof decryptPassphrase;
};
export default _default;
