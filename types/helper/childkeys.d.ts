export interface Network {
    wif: number;
    bip32: {
        public: number;
        private: number;
    };
    messagePrefix?: string;
    bech32?: string;
    pubKeyHash?: number;
    scriptHash?: number;
}
export declare function parseIntNoNaN(val: string, defaultVal: number): number;
export declare function getDerivationPath(derivationStandard: string, purposeValue: string, coinValue: string, accountValue: string, changeValue: string): string | null | undefined;
export declare function findDerivationPathErrors(path: string): string | false;
