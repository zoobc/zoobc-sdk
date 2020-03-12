"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var accountBalance_pb_1 = require("../grpc/model/accountBalance_pb");
var accountBalance_pb_service_1 = require("../grpc/service/accountBalance_pb_service");
var Network_1 = __importDefault(require("./Network"));
var grpc_web_1 = require("@improbable-eng/grpc-web");
function getBalance(address) {
    return new Promise(function (resolve, reject) {
        var networkIP = Network_1.default.selected;
        var request = new accountBalance_pb_1.GetAccountBalanceRequest();
        request.setAccountaddress(address);
        var client = new accountBalance_pb_service_1.AccountBalanceServiceClient(networkIP);
        client.getAccountBalance(request, function (err, res) {
            if (err) {
                var code = err.code, message = err.message;
                if (code == grpc_web_1.grpc.Code.NotFound) {
                    return resolve({
                        accountbalance: {
                            spendablebalance: '0',
                            balance: '0',
                            accountaddress: address,
                            blockheight: 0,
                            poprevenue: '0',
                            latest: true,
                        },
                    });
                }
                else if (code != grpc_web_1.grpc.Code.OK)
                    return reject(message);
            }
            if (res)
                resolve(res.toObject());
        });
    });
}
exports.getBalance = getBalance;
exports.default = { getBalance: getBalance };
