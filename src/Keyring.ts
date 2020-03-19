import { sign as ed25519 } from 'tweetnacl';
import * as bip39 from 'bip39';
import { BIP32Interface, fromSeed } from 'bip32';

import { Network, getDerivationPath, findDerivationPathErrors } from './helper/childkeys';

import { findCoin } from './helper/coins';

const NOT_IMPLEMENTED = 'Not Implemented';

const BITCOIN: Network = {
  messagePrefix: '\x18Bitcoin Signed Message:\n',
  bech32: 'bc',
  bip32: {
    public: 0x0488b21e,
    private: 0x0488ade4,
  },
  pubKeyHash: 0x00,
  scriptHash: 0x05,
  wif: 0x80,
};

export class ZooKeyring {
  // Each (hardware) wallet has only one seed. The seed can be represented in words.
  // One seed can be used for more than one network (e.g. Bitcoin, Ethereum, Ethereum Class, Ripple).
  // Unique rootKeys are generated for each network.
  // One rootKey can have multiple accounts (to separate balances, e.g. Savings / Current)
  // One account can have multiple sub-addresses (consolidated into a single balance)
  // Each sub-adddress has its own private-key and public-key (the "address")
  // Transactions can have unlimited number of "inputs" (sub-addresses used as source of coins).
  // Transaction must be signed by each address-level private-keys involved as an input.
  // Multiple signatures are attached to the transaction for verification.

  /**
   * Use seed.toString('hex') to get hexadecimal format.
   */
  private seed!: Buffer;
  private bip32RootKey!: BIP32Interface;
  private coinName: string = 'ZBC';

  constructor(passphrase: string, password: string, coinName: string = 'ZBC') {
    const { curveName = 'secp256k1' } = findCoin(coinName);
    this.seed = bip39.mnemonicToSeedSync(passphrase, password);
    this.coinName = coinName;
    this.bip32RootKey = fromSeed(this.seed, BITCOIN, curveName);
  }

  static generateRandomPhrase(numWords: number = 24, wordlist?: string[]): string {
    const strength = (numWords / 3) * 32;
    if (strength !== 128 && strength !== 256) return 'numWords only 12 or 24';
    return bip39.generateMnemonic(strength, undefined, wordlist);
  }

  calcDerivationPath(accountValue: number, changeValue: 0 | 1 = 0, bip32RootKey: BIP32Interface = this.bip32RootKey): BIP32Interface {
    const { curveName = 'secp256k1', derivationStandard = 'bip44', purposeValue = '44', coinValue } = findCoin(this.coinName);

    return this.calcForDerivationPath(
      curveName,
      derivationStandard,
      String(purposeValue),
      String(coinValue),
      String(accountValue),
      String(changeValue),
      bip32RootKey,
    );
  }

  private calcForDerivationPath(
    curveName: 'secp256k1' | 'P-256' | 'ed25519',
    derivationStandard: string,
    purposeValue: string,
    coinValue: string,
    accountValue: string,
    changeValue: string = '0',
    bip32RootKey: BIP32Interface = this.bip32RootKey,
  ): BIP32Interface {
    var derivationPath = getDerivationPath(derivationStandard, purposeValue, coinValue, accountValue, changeValue);

    var errorText = findDerivationPathErrors(derivationPath!);
    if (errorText) {
      // showValidationError(errorText);
      throw new Error(errorText);
    }
    let bip32ExtendedKey = bip32RootKey.derivePath(derivationPath!, curveName);

    const privKey = bip32ExtendedKey.privateKey;
    let publicKey: Buffer;
    if (curveName === 'secp256k1') {
      publicKey = bip32ExtendedKey.publicKey;
    } else if (curveName === 'ed25519') {
      publicKey = Buffer.from(ed25519.keyPair.fromSeed(bip32ExtendedKey.privateKey!).publicKey);
    } else {
      throw new Error(NOT_IMPLEMENTED);
    }

    bip32ExtendedKey = {
      ...bip32ExtendedKey,
      publicKey,
      sign(message: Uint8Array | Buffer, lowR?: boolean): Buffer {
        if (curveName === 'secp256k1') {
          return bip32ExtendedKey.sign(!Buffer.isBuffer(message) ? Buffer.from(message) : message, lowR);
        } else if (curveName === 'ed25519') {
          const { secretKey } = ed25519.keyPair.fromSeed(new Uint8Array(privKey!.buffer.slice(0, 32)));
          return Buffer.from(ed25519.detached(message, secretKey));
        } else {
          throw new Error(NOT_IMPLEMENTED);
        }
      },
      verify(message: Uint8Array | Buffer, signature: Uint8Array | Buffer): boolean {
        if (curveName === 'secp256k1') {
          return bip32ExtendedKey.verify(
            !Buffer.isBuffer(message) ? Buffer.from(message) : message,
            !Buffer.isBuffer(signature) ? Buffer.from(signature) : signature,
          );
        } else if (curveName === 'ed25519') {
          return ed25519.detached.verify(message, signature, this.publicKey);
        } else {
          throw new Error(NOT_IMPLEMENTED);
        }
      },
    };

    return bip32ExtendedKey;
  }
}
