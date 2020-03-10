"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var utils_1 = require("./helper/utils");
var proofOfOwnership_pb_1 = require("../grpc/model/proofOfOwnership_pb");
var nodeAdmin_pb_service_1 = require("../grpc/service/nodeAdmin_pb_service");
var grpc_web_1 = require("@improbable-eng/grpc-web");
function createAuth(requestType, seed) {
    var bytes;
    var timestamp = utils_1.writeInt64(Date.now());
    var requestTypeBytes = utils_1.writeInt32(requestType);
    bytes = Buffer.concat([timestamp, requestTypeBytes]);
    var signatureType = utils_1.writeInt32(0);
    var signature = seed.sign(bytes);
    return Buffer.concat([bytes, signatureType, signature]).toString('base64');
}
function request(auth, networkIp) {
    return new Promise(function (resolve, reject) {
        var request = new proofOfOwnership_pb_1.GetProofOfOwnershipRequest();
        var metadata = new grpc_web_1.grpc.Metadata({ authorization: auth });
        var client = new nodeAdmin_pb_service_1.NodeAdminServiceClient(networkIp);
        client.getProofOfOwnership(request, metadata, function (err, res) {
            if (err)
                reject(err);
            if (res) {
                var bytes = Buffer.concat([
                    Buffer.from(res.toObject().messagebytes.toString(), 'base64'),
                    Buffer.from(res.toObject().signature.toString(), 'base64'),
                ]);
                resolve(bytes);
            }
        });
    });
}
exports.default = { request: request, createAuth: createAuth };
