"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
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
exports.default = { list: list, set: set, selected: selected };
