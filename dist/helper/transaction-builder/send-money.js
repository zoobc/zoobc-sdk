"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var utils_1 = require("../utils");
var constant_1 = require("./constant");
var TRANSACTION_TYPE = new Buffer([1, 0, 0, 0]);
function sendMoneyBuilder(data, seed) {
    var bytes;
    var timestamp = utils_1.writeInt64(Math.trunc(Date.now() / 1000));
    var sender = Buffer.from(data.sender, 'utf-8');
    var recipient = Buffer.from(data.recipient, 'utf-8');
    var addressLength = utils_1.writeInt32(constant_1.ADDRESS_LENGTH);
    var fee = utils_1.writeInt64(data.fee * 1e8);
    var amount = utils_1.writeInt64(data.amount * 1e8);
    var bodyLength = utils_1.writeInt32(amount.length);
    bytes = Buffer.concat([TRANSACTION_TYPE, constant_1.VERSION, timestamp, addressLength, sender, addressLength, recipient, fee, bodyLength, amount]);
    if (data.approverAddress && data.commission && data.timeout && data.instruction) {
        // escrow bytes
        var approverAddressLength = utils_1.writeInt32(constant_1.ADDRESS_LENGTH);
        var approverAddress = Buffer.from(data.approverAddress, 'utf-8');
        var commission = utils_1.writeInt64(data.commission * 1e8);
        var timeout = utils_1.writeInt64(data.timeout);
        var instruction = Buffer.from(data.instruction, 'utf-8');
        var instructionLength = utils_1.writeInt32(instruction.length);
        bytes = Buffer.concat([bytes, approverAddressLength, approverAddress, commission, timeout, instructionLength, instruction]);
    }
    else {
        // escrow bytes default value
        var approverAddressLength = utils_1.writeInt32(0);
        var commission = utils_1.writeInt64(0);
        var timeout = utils_1.writeInt64(0);
        var instructionLength = utils_1.writeInt32(0);
        bytes = Buffer.concat([bytes, approverAddressLength, commission, timeout, instructionLength]);
    }
    var signatureType = utils_1.writeInt32(0);
    var signature = seed.sign(bytes);
    var bodyLengthSignature = utils_1.writeInt32(signatureType.length + signature.length);
    return Buffer.concat([bytes, bodyLengthSignature, signatureType, signature]);
}
exports.sendMoneyBuilder = sendMoneyBuilder;
