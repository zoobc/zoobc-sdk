"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var converters_1 = require("./converters");
var CryptoJS = __importStar(require("crypto-js"));
var bn_js_1 = __importDefault(require("bn.js"));
// getAddressFromPublicKey Get the formatted address from a raw public key
function getZBCAdress(publicKey) {
    var checksum = getChecksumByte(publicKey);
    var binary = '';
    var bytes = new Uint8Array(33);
    bytes.set(publicKey, 0);
    bytes.set([checksum[0]], 32);
    var len = bytes.byteLength;
    for (var i = 0; i < len; i++) {
        binary += String.fromCharCode(bytes[i]);
    }
    return converters_1.toBase64Url(window.btoa(binary));
}
exports.getZBCAdress = getZBCAdress;
function getChecksumByte(bytes) {
    var n = bytes.length;
    var a = 0;
    for (var i = 0; i < n; i++) {
        a += bytes[i];
    }
    var res = new Uint8Array([a]);
    return res;
}
function encryptPassword(password, salt) {
    if (salt === void 0) { salt = 'salt'; }
    return CryptoJS.PBKDF2(password, salt, {
        keySize: 8,
        iterations: 10000,
    }).toString();
}
exports.encryptPassword = encryptPassword;
function isZBCAddressValid(address) {
    var addressBase64 = converters_1.fromBase64Url(address);
    var addressBytes = converters_1.base64ToBuffer(addressBase64);
    if (addressBytes.length == 33 && addressBase64.length == 44) {
        return true;
    }
    else
        return false;
}
exports.isZBCAddressValid = isZBCAddressValid;
function isZBCPublicKeyValid(pubkey) {
    var addressBytes = converters_1.base64ToBuffer(pubkey);
    if (addressBytes.length == 32 && pubkey.length == 44) {
        return true;
    }
    else
        return false;
}
exports.isZBCPublicKeyValid = isZBCPublicKeyValid;
function writeInt64(number, base, endian) {
    number = number.toString();
    var bn = new bn_js_1.default(number, base, endian);
    var buffer = bn.toArrayLike(Buffer, 'le', 8);
    if (number[0] == '-') {
        var array = buffer.map(function (b, i) {
            if (i == 0)
                b = Math.abs(b - 256);
            else
                b = Math.abs(b - 255);
            return b;
        });
        buffer = new Buffer(array);
    }
    return buffer;
}
exports.writeInt64 = writeInt64;
function readInt64(buff, offset) {
    var buff1 = buff.readUInt32LE(offset);
    var buff2 = buff.readUInt32LE(offset + 4);
    if (!(buff2 & 0x80000000))
        return buff1 + 0x100000000 * buff2;
    return -((~buff2 >>> 0) * 0x100000000 + (~buff1 >>> 0) + 1);
}
exports.readInt64 = readInt64;
function writeInt32(number) {
    var byte = new Buffer(4);
    byte.writeUInt32LE(number, 0);
    return byte;
}
exports.writeInt32 = writeInt32;
