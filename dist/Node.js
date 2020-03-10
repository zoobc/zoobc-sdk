"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var nodeHardware_pb_service_1 = require("../grpc/service/nodeHardware_pb_service");
var nodeAdmin_pb_service_1 = require("../grpc/service/nodeAdmin_pb_service");
var nodeRegistration_pb_service_1 = require("../grpc/service/nodeRegistration_pb_service");
var rxjs_1 = require("rxjs");
var auth_pb_1 = require("../grpc/model/auth_pb");
var nodeHardware_pb_1 = require("../grpc/model/nodeHardware_pb");
var grpc_web_1 = require("@improbable-eng/grpc-web");
var node_pb_1 = require("../grpc/model/node_pb");
var Network_1 = __importDefault(require("./Network"));
var nodeRegistration_pb_1 = require("../grpc/model/nodeRegistration_pb");
var register_node_1 = require("./helper/transaction-builder/register-node");
var update_node_1 = require("./helper/transaction-builder/update-node");
var remove_node_1 = require("./helper/transaction-builder/remove-node");
var claim_node_1 = require("./helper/transaction-builder/claim-node");
var Poown_1 = __importDefault(require("./Poown"));
var transaction_pb_1 = require("../grpc/model/transaction_pb");
var transaction_pb_service_1 = require("../grpc/service/transaction_pb_service");
function getHardwareInfo(networkIP, childSeed) {
    return new rxjs_1.Observable(function (observer) {
        var auth = Poown_1.default.createAuth(auth_pb_1.RequestType.GETPROOFOFOWNERSHIP, childSeed);
        var request = new nodeHardware_pb_1.GetNodeHardwareRequest();
        var client = new nodeHardware_pb_service_1.NodeHardwareServiceClient(networkIP)
            .getNodeHardware(new grpc_web_1.grpc.Metadata({ authorization: auth }))
            .write(request)
            .on('data', function (message) {
            observer.next(message.toObject());
        })
            .on('end', function (status) {
            observer.error(status);
        });
        client.end();
    });
}
function generateNodeKey(networkIP, childSeed) {
    return new Promise(function (resolve, reject) {
        var auth = Poown_1.default.createAuth(auth_pb_1.RequestType.GENERATETNODEKEY, childSeed);
        var metadata = new grpc_web_1.grpc.Metadata({ authorization: auth });
        var request = new node_pb_1.GenerateNodeKeyRequest();
        var client = new nodeAdmin_pb_service_1.NodeAdminServiceClient(networkIP);
        client.generateNodeKey(request, metadata, function (err, res) {
            if (err)
                reject(err);
            if (res)
                resolve(res.toObject());
        });
    });
}
function getOne(address) {
    return new Promise(function (resolve, reject) {
        var networkIP = Network_1.default.selected;
        var request = new nodeRegistration_pb_1.GetNodeRegistrationRequest();
        request.setAccountaddress(address);
        var client = new nodeRegistration_pb_service_1.NodeRegistrationServiceClient(networkIP);
        client.getNodeRegistration(request, function (err, res) {
            if (err)
                reject(err);
            if (res)
                resolve(res.toObject());
        });
    });
}
function register(data, childSeed) {
    return new Promise(function (resolve, reject) {
        var bytes = register_node_1.registerNodeBuilder(data, childSeed);
        var request = new transaction_pb_1.PostTransactionRequest();
        request.setTransactionbytes(bytes);
        var networkIP = Network_1.default.selected;
        var client = new transaction_pb_service_1.TransactionServiceClient(networkIP);
        client.postTransaction(request, function (err, res) {
            if (err)
                reject(err);
            if (res)
                resolve(res.toObject());
        });
    });
}
function update(data, childSeed) {
    return new Promise(function (resolve, reject) {
        var auth = Poown_1.default.createAuth(auth_pb_1.RequestType.GETPROOFOFOWNERSHIP, childSeed);
        Poown_1.default.request(auth, data.nodeAddress)
            .then(function (poown) {
            var bytes = update_node_1.updateNodeBuilder(data, poown, childSeed);
            var request = new transaction_pb_1.PostTransactionRequest();
            request.setTransactionbytes(bytes);
            var networkIP = Network_1.default.selected;
            var client = new transaction_pb_service_1.TransactionServiceClient(networkIP);
            client.postTransaction(request, function (err, res) {
                if (err)
                    reject(err);
                if (res)
                    resolve(res.toObject());
            });
        })
            .catch(function (err) {
            reject(err);
        });
    });
}
function remove(data, childSeed) {
    return new Promise(function (resolve, reject) {
        var bytes = remove_node_1.removeNodeBuilder(data, childSeed);
        var request = new transaction_pb_1.PostTransactionRequest();
        request.setTransactionbytes(bytes);
        var networkIP = Network_1.default.selected;
        var client = new transaction_pb_service_1.TransactionServiceClient(networkIP);
        client.postTransaction(request, function (err, res) {
            if (err)
                reject(err);
            if (res)
                resolve(res.toObject());
        });
    });
}
function claim(data, childSeed) {
    return new Promise(function (resolve, reject) {
        var bytes = claim_node_1.claimNodeBuilder(data, childSeed);
        var request = new transaction_pb_1.PostTransactionRequest();
        request.setTransactionbytes(bytes);
        var networkIP = Network_1.default.selected;
        var client = new transaction_pb_service_1.TransactionServiceClient(networkIP);
        client.postTransaction(request, function (err, res) {
            if (err)
                reject(err);
            if (res)
                resolve(res.toObject());
        });
    });
}
exports.default = {
    register: register,
    update: update,
    remove: remove,
    claim: claim,
    getHardwareInfo: getHardwareInfo,
    generateNodeKey: generateNodeKey,
    getOne: getOne,
};
