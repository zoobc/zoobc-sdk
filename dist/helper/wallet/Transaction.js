"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var utils_1 = require("../utils");
function toTransactionListWallet(res, ownAddress) {
    var transactionList = res.transactionsList.map(function (tx) {
        var bytes = Buffer.from(tx.transactionbodybytes.toString(), 'base64');
        var amount = utils_1.readInt64(bytes, 0);
        var friendAddress = tx.senderaccountaddress == ownAddress ? tx.recipientaccountaddress : tx.senderaccountaddress;
        var type = tx.senderaccountaddress == ownAddress ? 'send' : 'receive';
        return {
            id: tx.id,
            address: friendAddress,
            type: type,
            timestamp: parseInt(tx.timestamp) * 1000,
            fee: parseInt(tx.fee),
            amount: amount,
            blockId: tx.blockid,
            height: tx.height,
            transactionIndex: tx.transactionindex,
        };
    });
    return {
        total: parseInt(res.total),
        transactions: transactionList,
    };
}
exports.toTransactionListWallet = toTransactionListWallet;
