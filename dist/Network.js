"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var empty_pb_1 = require("../grpc/model/empty_pb");
var healthCheck_pb_service_1 = require("../grpc/service/healthCheck_pb_service");
var Network = /** @class */ (function () {
    function Network() {
        this.idx = 0;
        this.hosts = [];
    }
    Object.defineProperty(Network.prototype, "list", {
        get: function () {
            return this.hosts;
        },
        set: function (hosts) {
            this.hosts = hosts;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Network.prototype, "id", {
        get: function () {
            return this.idx;
        },
        set: function (id) {
            this.idx = id;
        },
        enumerable: true,
        configurable: true
    });
    return Network;
}());
var network = new Network();
function list(hosts) {
    network.list = hosts;
}
function set(idx) {
    network.id = idx;
}
function selected() {
    return network.list[network.id];
}
function ping() {
    return new Promise(function (resolve, reject) {
        var networkIP = selected();
        var client = new healthCheck_pb_service_1.HealthCheckServiceClient(networkIP.host);
        var request = new empty_pb_1.Empty();
        client.healthCheck(request, function (err) {
            if (err)
                return reject(err);
            return resolve('PONG');
        });
    });
}
exports.default = { list: list, set: set, selected: selected, ping: ping };
