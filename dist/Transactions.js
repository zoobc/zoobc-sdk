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
function get(address, page, limit) {
    return new Promise(function (resolve, reject) {
        var networkIP = Network_1.default.selected;
        var request = new transaction_pb_1.GetTransactionsRequest();
        var pagination = new pagination_pb_1.Pagination();
        pagination.setLimit(limit);
        pagination.setPage(page);
        pagination.setOrderby(pagination_pb_1.OrderBy.DESC);
        request.setAccountaddress(address);
        request.setPagination(pagination);
        request.setTransactiontype(1);
        var client = new transaction_pb_service_1.TransactionServiceClient(networkIP);
        client.getTransactions(request, function (err, res) {
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
        var request = new transaction_pb_1.GetTransactionRequest();
        request.setId(id);
        var client = new transaction_pb_service_1.TransactionServiceClient(networkIP);
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
        var networkIP = Network_1.default.selected;
        var request = new transaction_pb_1.PostTransactionRequest();
        request.setTransactionbytes(txBytes);
        var client = new transaction_pb_service_1.TransactionServiceClient(networkIP);
        client.postTransaction(request, function (err, res) {
            if (err)
                reject(err);
            if (res)
                resolve(res.toObject());
        });
    });
}
exports.default = { sendMoney: sendMoney, get: get, getOne: getOne };
