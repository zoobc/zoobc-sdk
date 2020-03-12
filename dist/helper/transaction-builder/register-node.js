"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var converters_1 = require("../converters");
var utils_1 = require("../utils");
var constant_1 = require("./constant");
var TRANSACTION_TYPE = new Buffer([2, 0, 0, 0]);
function registerNodeBuilder(data, seed) {
    var bytes;
    var timestamp = utils_1.writeInt64(Math.trunc(Date.now() / 1000));
    var accountAddress = Buffer.from(data.accountAddress, 'utf-8');
    var recipient = new Buffer(constant_1.ADDRESS_LENGTH);
    var addressLength = utils_1.writeInt32(constant_1.ADDRESS_LENGTH);
    var fee = utils_1.writeInt64(data.fee * 1e8);
    var nodePublicKey = converters_1.base64ToBuffer(data.nodePublicKey);
    var nodeAddress = Buffer.from(data.nodeAddress, 'utf-8');
    var nodeAddressLength = utils_1.writeInt32(nodeAddress.length);
    var funds = utils_1.writeInt64(data.funds * 1e8);
    var bodyLength = utils_1.writeInt32(nodePublicKey.length +
        addressLength.length +
        accountAddress.length +
        nodeAddressLength.length +
        nodeAddress.length +
        funds.length +
        data.poown.length);
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
        addressLength,
        accountAddress,
        nodeAddressLength,
        nodeAddress,
        funds,
        data.poown,
    ]);
    var signatureType = utils_1.writeInt32(0);
    var signature = seed.sign(bytes);
    var bodyLengthSignature = utils_1.writeInt32(signatureType.length + signature.length);
    return Buffer.concat([bytes, bodyLengthSignature, signatureType, signature]);
}
exports.registerNodeBuilder = registerNodeBuilder;
