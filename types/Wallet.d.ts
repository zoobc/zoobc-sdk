export declare function encryptPassphrase(passphrase: string, password: string, salt?: string): string;
export declare function decryptPassphrase(encPassphrase: string, password: string, salt?: string): string;
declare const _default: {
    encryptPassphrase: typeof encryptPassphrase;
    decryptPassphrase: typeof decryptPassphrase;
};
export default _default;
