"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function base64ToBuffer(base64) {
    return new Buffer(base64, 'base64');
}
exports.base64ToBuffer = base64ToBuffer;
function bufferToBase64(bytes) {
    var buf = bytes instanceof ArrayBuffer
        ? Buffer.from(bytes)
        : ArrayBuffer.isView(bytes)
            ? Buffer.from(bytes.buffer, bytes.byteOffset, bytes.byteLength)
            : Buffer.from(bytes);
    return buf.toString('base64');
}
exports.bufferToBase64 = bufferToBase64;
function toBase64Url(base64Str) {
    return base64Str
        .replace(/\+/g, '-')
        .replace(/\//g, '_')
        .replace(/\=/g, '');
}
exports.toBase64Url = toBase64Url;
function fromBase64Url(base64Str) {
    var base64 = base64Str.replace(/\-/g, '+').replace(/\_/g, '/');
    var pad = base64.length % 4;
    if (pad)
        base64 += new Array(5 - pad).join('=');
    return base64;
}
exports.fromBase64Url = fromBase64Url;
