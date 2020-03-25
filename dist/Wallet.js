"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var CryptoJS = __importStar(require("crypto-js"));
var utils_1 = require("./helper/utils");
function encryptPassphrase(passphrase, password, salt) {
    if (salt === void 0) { salt = 'salt'; }
    var key = utils_1.encryptPassword(password, salt);
    return CryptoJS.AES.encrypt(passphrase, key).toString();
}
exports.encryptPassphrase = encryptPassphrase;
function decryptPassphrase(encPassphrase, password, salt) {
    if (salt === void 0) { salt = 'salt'; }
    var key = utils_1.encryptPassword(password, salt);
    try {
        var seed = CryptoJS.AES.decrypt(encPassphrase, key).toString(CryptoJS.enc.Utf8);
        if (!seed)
            throw 'not match';
        return seed;
    }
    catch (e) {
        return '';
    }
}
exports.decryptPassphrase = decryptPassphrase;
exports.default = { encryptPassphrase: encryptPassphrase, decryptPassphrase: decryptPassphrase };
