"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var Network_1 = __importDefault(require("./Network"));
var transaction_pb_1 = require("../grpc/model/transaction_pb");
var pagination_pb_1 = require("../grpc/model/pagination_pb");
var transaction_pb_service_1 = require("../grpc/service/transaction_pb_service");
var send_money_1 = require("./helper/transaction-builder/send-money");
function getList(params) {
    return new Promise(function (resolve, reject) {
        var request = new transaction_pb_1.GetTransactionsRequest();
        var networkIP = Network_1.default.selected();
        if (params) {
            var address = params.address, height = params.height, transactionType = params.transactionType, timestampStart = params.timestampStart, timestampEnd = params.timestampEnd, pagination = params.pagination;
            if (address)
                request.setAccountaddress(address);
            if (height)
                request.setHeight(height);
            if (transactionType)
                request.setTransactiontype(transactionType);
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
        var client = new transaction_pb_service_1.TransactionServiceClient(networkIP.host);
        client.getTransactions(request, function (err, res) {
            if (err)
                reject(err);
            if (res)
                resolve(res.toObject());
        });
    });
}
function get(id) {
    return new Promise(function (resolve, reject) {
        var networkIP = Network_1.default.selected();
        var request = new transaction_pb_1.GetTransactionRequest();
        request.setId(id);
        var client = new transaction_pb_service_1.TransactionServiceClient(networkIP.host);
        client.getTransaction(request, function (err, res) {
            if (err)
                reject(err.message);
            if (res)
                resolve(res.toObject());
        });
    });
}
function sendMoney(data, seed) {
    var txBytes = send_money_1.sendMoneyBuilder(data, seed);
    return new Promise(function (resolve, reject) {
        var networkIP = Network_1.default.selected();
        var request = new transaction_pb_1.PostTransactionRequest();
        request.setTransactionbytes(txBytes);
        var client = new transaction_pb_service_1.TransactionServiceClient(networkIP.host);
        client.postTransaction(request, function (err, res) {
            if (err)
                reject(err);
            if (res)
                resolve(res.toObject());
        });
    });
}
exports.default = { sendMoney: sendMoney, get: get, getList: getList };
