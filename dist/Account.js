"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var accountBalance_pb_1 = require("../grpc/model/accountBalance_pb");
var accountBalance_pb_service_1 = require("../grpc/service/accountBalance_pb_service");
var Network_1 = __importDefault(require("./Network"));
function getBalance(address) {
    return new Promise(function (resolve, reject) {
        var networkIP = Network_1.default.selected;
        var request = new accountBalance_pb_1.GetAccountBalanceRequest();
        request.setAccountaddress(address);
        var client = new accountBalance_pb_service_1.AccountBalanceServiceClient(networkIP);
        client.getAccountBalance(request, function (err, res) {
            if (err)
                reject(err);
            if (res)
                resolve(res.toObject());
        });
    });
}
exports.default = { getBalance: getBalance };
