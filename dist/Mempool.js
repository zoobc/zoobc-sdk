"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var Network_1 = __importDefault(require("./Network"));
var mempool_pb_1 = require("../grpc/model/mempool_pb");
var pagination_pb_1 = require("../grpc/model/pagination_pb");
var mempool_pb_service_1 = require("../grpc/service/mempool_pb_service");
function get(params) {
    return new Promise(function (resolve, reject) {
        var networkIP = Network_1.default.selected;
        var request = new mempool_pb_1.GetMempoolTransactionsRequest();
        if (params) {
            var address = params.address, timestampEnd = params.timestampEnd, timestampStart = params.timestampStart, pagination = params.pagination;
            if (address)
                request.setAddress(address);
            if (timestampStart)
                request.setTimestampstart(timestampStart);
            if (timestampEnd)
                request.setTimestampend(timestampEnd);
            if (pagination) {
                var reqPagination = new pagination_pb_1.Pagination();
                reqPagination.setLimit(pagination.limit || 10);
                reqPagination.setPage(pagination.page || 1);
                reqPagination.setOrderby(pagination.orderBy || pagination_pb_1.OrderBy.DESC);
                request.setPagination(reqPagination);
            }
        }
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
