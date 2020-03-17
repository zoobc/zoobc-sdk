"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var block_pb_1 = require("../grpc/model/block_pb");
var block_pb_service_1 = require("../grpc/service/block_pb_service");
var Network_1 = __importDefault(require("./Network"));
function getBlocks(params) {
    return new Promise(function (resolve, reject) {
        var networkIP = Network_1.default.selected();
        var request = new block_pb_1.GetBlocksRequest();
        var clientOptions = {};
        var height = params.height, limit = params.limit, transport = params.transport;
        request.setHeight(height);
        request.setLimit(limit || 10);
        if (transport)
            clientOptions.transport = transport;
        var client = new block_pb_service_1.BlockServiceClient(networkIP.host, clientOptions);
        client.getBlocks(request, function (err, res) {
            if (err)
                reject(err);
            if (res)
                resolve(res.toObject());
        });
    });
}
function getBlockById(id, transport) {
    return new Promise(function (resolve, reject) {
        var networkIP = Network_1.default.selected();
        var request = new block_pb_1.GetBlockRequest();
        var clientOptions = {};
        request.setId(id);
        if (transport)
            clientOptions.transport = transport;
        var client = new block_pb_service_1.BlockServiceClient(networkIP.host, clientOptions);
        client.getBlock(request, function (err, res) {
            if (err)
                reject(err);
            if (res)
                resolve(res.toObject());
        });
    });
}
function getBlockByHeight(height, transport) {
    return new Promise(function (resolve, reject) {
        var networkIP = Network_1.default.selected();
        var request = new block_pb_1.GetBlockRequest();
        var clientOptions = {};
        request.setHeight(height);
        if (transport)
            clientOptions.transport = transport;
        var client = new block_pb_service_1.BlockServiceClient(networkIP.host, clientOptions);
        client.getBlock(request, function (err, res) {
            if (err)
                reject(err);
            if (res)
                resolve(res.toObject());
        });
    });
}
exports.default = { getBlocks: getBlocks, getBlockById: getBlockById, getBlockByHeight: getBlockByHeight };
