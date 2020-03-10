"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var Network_1 = __importDefault(require("./Network"));
var host_pb_service_1 = require("../grpc/service/host_pb_service");
var empty_pb_1 = require("../grpc/model/empty_pb");
function getBlock() {
    return new Promise(function (resolve, reject) {
        var networkIP = Network_1.default.selected;
        var request = new empty_pb_1.Empty();
        var client = new host_pb_service_1.HostServiceClient(networkIP);
        client.getHostInfo(request, function (err, res) {
            if (err)
                reject(err.message);
            if (res)
                resolve(res.toObject());
        });
    });
}
exports.default = { getBlock: getBlock };
