"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var converters_1 = require("../converters");
var utils_1 = require("../utils");
var constant_1 = require("./constant");
var TRANSACTION_TYPE = new Buffer([2, 2, 0, 0]);
function removeNodeBuilder(data, seed) {
    var bytes;
    var timestamp = utils_1.writeInt64(Math.trunc(Date.now() / 1000));
    var accountAddress = Buffer.from(data.accountAddress, 'utf-8');
    var recipient = new Buffer(constant_1.ADDRESS_LENGTH);
    var addressLength = utils_1.writeInt32(constant_1.ADDRESS_LENGTH);
    var fee = utils_1.writeInt64(data.fee * 1e8);
    var nodePublicKey = converters_1.base64ToBuffer(data.nodePublicKey);
    var bodyLength = utils_1.writeInt32(nodePublicKey.length);
    bytes = Buffer.concat([
        TRANSACTION_TYPE,
        constant_1.VERSION,
        timestamp,
        addressLength,
        accountAddress,
        addressLength,
        recipient,
        fee,
        bodyLength,
        nodePublicKey,
    ]);
    // ========== NULLIFYING THE ESCROW ===========
    var approverAddressLength = utils_1.writeInt32(0);
    var commission = utils_1.writeInt64(0);
    var timeout = utils_1.writeInt64(0);
    var instructionLength = utils_1.writeInt32(0);
    bytes = Buffer.concat([bytes, approverAddressLength, commission, timeout, instructionLength]);
    // ========== END NULLIFYING THE ESCROW =========
    var signatureType = utils_1.writeInt32(0);
    var signature = seed.sign(bytes);
    var bodyLengthSignature = utils_1.writeInt32(signatureType.length + signature.length);
    return Buffer.concat([bytes, bodyLengthSignature, signatureType, signature]);
}
exports.removeNodeBuilder = removeNodeBuilder;
