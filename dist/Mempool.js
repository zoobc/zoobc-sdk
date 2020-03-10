"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var Network_1 = __importDefault(require("./Network"));
var mempool_pb_1 = require("../grpc/model/mempool_pb");
var pagination_pb_1 = require("../grpc/model/pagination_pb");
var mempool_pb_service_1 = require("../grpc/service/mempool_pb_service");
function get(address, page, limit) {
    return new Promise(function (resolve, reject) {
        var networkIP = Network_1.default.selected;
        var request = new mempool_pb_1.GetMempoolTransactionsRequest();
        var pagination = new pagination_pb_1.Pagination();
        pagination.setLimit(limit);
        pagination.setPage(page);
        pagination.setOrderby(pagination_pb_1.OrderBy.DESC);
        request.setAddress(address);
        request.setPagination(pagination);
        var client = new mempool_pb_service_1.MempoolServiceClient(networkIP);
        client.getMempoolTransactions(request, function (err, res) {
            if (err)
                reject(err);
            if (res)
                resolve(res.toObject());
        });
    });
}
function getOne(id) {
    return new Promise(function (resolve, reject) {
        var networkIP = Network_1.default.selected;
        var request = new mempool_pb_1.GetMempoolTransactionRequest();
        request.setId(id);
        var client = new mempool_pb_service_1.MempoolServiceClient(networkIP);
        client.getMempoolTransaction(request, function (err, res) {
            if (err)
                reject(err.message);
            if (res)
                resolve(res.toObject().transaction);
        });
    });
}
exports.default = { get: get, getOne: getOne };
