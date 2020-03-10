export interface CoinInterface {
    name: string;
    segwitAvailable?: boolean;
    bip49available?: boolean;
    network: string;
    coinValue: number;
    purposeValue?: number;
    derivationStandard?: 'sep5' | 'bip32' | 'bip44' | 'bip49' | 'bip84' | 'bip141';
    curveName?: 'secp256k1' | 'P-256' | 'ed25519';
}
export declare function findCoin(coinName: string): CoinInterface;
export declare const coins: Array<CoinInterface>;
