"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var utils_1 = require("../utils");
var constant_1 = require("./constant");
var TRANSACTION_TYPE = new Buffer([4, 0, 0, 0]);
function escrowBuilder(data, seed) {
    var bytes;
    var timestamp = utils_1.writeInt64(Math.trunc(Date.now() / 1000));
    var approvalAddress = Buffer.from(data.approvalAddress, 'utf-8');
    var addressLength = utils_1.writeInt32(constant_1.ADDRESS_LENGTH);
    var recepient = new Buffer(constant_1.ADDRESS_LENGTH);
    var fee = utils_1.writeInt64(data.fee * 1e8);
    var approvalCode = utils_1.writeInt32(data.approvalCode);
    var transactionId = utils_1.writeInt64(data.transactionId);
    var bodyLength = utils_1.writeInt32(approvalCode.length + transactionId.length);
    bytes = Buffer.concat([
        TRANSACTION_TYPE,
        constant_1.VERSION,
        timestamp,
        addressLength,
        approvalAddress,
        addressLength,
        recepient,
        fee,
        bodyLength,
        approvalCode,
        transactionId,
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
exports.escrowBuilder = escrowBuilder;
