"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var tweetnacl_1 = require("tweetnacl");
var bip39 = __importStar(require("bip39"));
var bip32_1 = require("bip32");
var childkeys_1 = require("./helper/childkeys");
var coins_1 = require("./helper/coins");
var NOT_IMPLEMENTED = 'Not Implemented';
var BITCOIN = {
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
var ZooKeyring = /** @class */ (function () {
    function ZooKeyring(passphrase, password, coinName) {
        if (coinName === void 0) { coinName = 'ZBC'; }
        this.coinName = 'ZBC';
        var _a = coins_1.findCoin(coinName).curveName, curveName = _a === void 0 ? 'secp256k1' : _a;
        this.seed = bip39.mnemonicToSeedSync(passphrase, password);
        this.coinName = coinName;
        this.bip32RootKey = bip32_1.fromSeed(this.seed, BITCOIN, curveName);
    }
    ZooKeyring.generateRandomPhrase = function (numWords, lang) {
        if (numWords === void 0) { numWords = 24; }
        if (lang === void 0) { lang = 'english'; }
        bip39.setDefaultWordlist(lang);
        var strength = (numWords / 3) * 32;
        if (strength !== 128 && strength !== 256)
            return 'numWords only 12 or 24';
        return bip39.generateMnemonic(strength, undefined);
    };
    ZooKeyring.isPassphraseValid = function (passphrase, lang) {
        if (lang === void 0) { lang = 'english'; }
        bip39.setDefaultWordlist(lang);
        return bip39.validateMnemonic(passphrase);
    };
    ZooKeyring.prototype.calcDerivationPath = function (accountValue, changeValue, bip32RootKey) {
        if (changeValue === void 0) { changeValue = 0; }
        if (bip32RootKey === void 0) { bip32RootKey = this.bip32RootKey; }
        var _a = coins_1.findCoin(this.coinName), _b = _a.curveName, curveName = _b === void 0 ? 'secp256k1' : _b, _c = _a.derivationStandard, derivationStandard = _c === void 0 ? 'bip44' : _c, _d = _a.purposeValue, purposeValue = _d === void 0 ? '44' : _d, coinValue = _a.coinValue;
        return this.calcForDerivationPath(curveName, derivationStandard, String(purposeValue), String(coinValue), String(accountValue), String(changeValue), bip32RootKey);
    };
    ZooKeyring.prototype.calcForDerivationPath = function (curveName, derivationStandard, purposeValue, coinValue, accountValue, changeValue, bip32RootKey) {
        if (changeValue === void 0) { changeValue = '0'; }
        if (bip32RootKey === void 0) { bip32RootKey = this.bip32RootKey; }
        var derivationPath = childkeys_1.getDerivationPath(derivationStandard, purposeValue, coinValue, accountValue, changeValue);
        var errorText = childkeys_1.findDerivationPathErrors(derivationPath);
        if (errorText) {
            // showValidationError(errorText);
            throw new Error(errorText);
        }
        var bip32ExtendedKey = bip32RootKey.derivePath(derivationPath, curveName);
        var privKey = bip32ExtendedKey.privateKey;
        var publicKey;
        if (curveName === 'secp256k1') {
            publicKey = bip32ExtendedKey.publicKey;
        }
        else if (curveName === 'ed25519') {
            publicKey = Buffer.from(tweetnacl_1.sign.keyPair.fromSeed(bip32ExtendedKey.privateKey).publicKey);
        }
        else {
            throw new Error(NOT_IMPLEMENTED);
        }
        bip32ExtendedKey = __assign(__assign({}, bip32ExtendedKey), { publicKey: publicKey,
            sign: function (message, lowR) {
                if (curveName === 'secp256k1') {
                    return bip32ExtendedKey.sign(!Buffer.isBuffer(message) ? Buffer.from(message) : message, lowR);
                }
                else if (curveName === 'ed25519') {
                    var secretKey = tweetnacl_1.sign.keyPair.fromSeed(new Uint8Array(privKey.buffer.slice(0, 32))).secretKey;
                    return Buffer.from(tweetnacl_1.sign.detached(message, secretKey));
                }
                else {
                    throw new Error(NOT_IMPLEMENTED);
                }
            },
            verify: function (message, signature) {
                if (curveName === 'secp256k1') {
                    return bip32ExtendedKey.verify(!Buffer.isBuffer(message) ? Buffer.from(message) : message, !Buffer.isBuffer(signature) ? Buffer.from(signature) : signature);
                }
                else if (curveName === 'ed25519') {
                    return tweetnacl_1.sign.detached.verify(message, signature, this.publicKey);
                }
                else {
                    throw new Error(NOT_IMPLEMENTED);
                }
            } });
        return bip32ExtendedKey;
    };
    return ZooKeyring;
}());
exports.ZooKeyring = ZooKeyring;
