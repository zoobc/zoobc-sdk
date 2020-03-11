"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var Network_1 = __importDefault(require("./Network"));
var pagination_pb_1 = require("../grpc/model/pagination_pb");
var escrow_transaction_1 = require("./helper/transaction-builder/escrow-transaction");
var escrow_pb_1 = require("../grpc/model/escrow_pb");
var escrow_pb_service_1 = require("../grpc/service/escrow_pb_service");
var transaction_pb_1 = require("../grpc/model/transaction_pb");
var transaction_pb_service_1 = require("../grpc/service/transaction_pb_service");
function getList(params) {
    return new Promise(function (resolve, reject) {
        var networkIP = Network_1.default.selected;
        var request = new escrow_pb_1.GetEscrowTransactionsRequest();
        if (params) {
            var approverAddress = params.approverAddress, blockHeightStart = params.blockHeightStart, blockHeightEnd = params.blockHeightEnd, id = params.id, statusList = params.statusList, pagination = params.pagination;
            if (approverAddress)
                request.setApproveraddress(approverAddress);
            if (blockHeightStart)
                request.setBlockheightstart(blockHeightStart);
            if (blockHeightEnd)
                request.setBlockheightend(blockHeightEnd);
            if (id)
                request.setId(id);
            if (statusList)
                request.setStatusesList(statusList);
            if (pagination) {
                var reqPagination = new pagination_pb_1.Pagination();
                reqPagination.setLimit(pagination.limit || 10);
                reqPagination.setPage(pagination.page || 1);
                reqPagination.setOrderby(pagination.orderBy || pagination_pb_1.OrderBy.ASC);
                request.setPagination(reqPagination);
            }
        }
        var client = new escrow_pb_service_1.EscrowTransactionServiceClient(networkIP);
        client.getEscrowTransactions(request, function (err, res) {
            if (err)
                return reject(err.message);
            resolve(res === null || res === void 0 ? void 0 : res.toObject());
        });
    });
}
function get(id) {
    return new Promise(function (resolve, reject) {
        var networkIP = Network_1.default.selected;
        var request = new escrow_pb_1.GetEscrowTransactionRequest();
        request.setId(id);
        var client = new escrow_pb_service_1.EscrowTransactionServiceClient(networkIP);
        client.getEscrowTransaction(request, function (err, res) {
            if (err)
                reject(err.message);
            resolve(res === null || res === void 0 ? void 0 : res.toObject());
        });
    });
}
function approval(data, seed) {
    var txBytes = escrow_transaction_1.escrowBuilder(data, seed);
    return new Promise(function (resolve, reject) {
        var networkIP = Network_1.default.selected;
        var request = new transaction_pb_1.PostTransactionRequest();
        request.setTransactionbytes(txBytes);
        var client = new transaction_pb_service_1.TransactionServiceClient(networkIP);
        client.postTransaction(request, function (err, res) {
            if (err)
                reject(err.message);
            resolve(res === null || res === void 0 ? void 0 : res.toObject());
        });
    });
}
exports.default = { approval: approval, get: get, getList: getList };
