import { BIP32Interface } from 'bip32';
export declare class ZooKeyring {
    /**
     * Use seed.toString('hex') to get hexadecimal format.
     */
    private seed;
    private bip32RootKey;
    private coinName;
    constructor(passphrase: string, password: string, coinName?: string);
    static generateRandomPhrase(numWords?: number, wordlist?: string[]): string;
    calcDerivationPath(accountValue: number, changeValue?: 0 | 1, bip32RootKey?: BIP32Interface): BIP32Interface;
    private calcForDerivationPath;
}
