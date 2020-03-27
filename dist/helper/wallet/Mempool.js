"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var utils_1 = require("../utils");
var transaction_pb_1 = require("../../../grpc/model/transaction_pb");
function toUnconfirmedSendMoneyWallet(res, ownAddress) {
    var transactions = res.mempooltransactionsList.filter(function (tx) {
        var bytes = Buffer.from(tx.transactionbytes.toString(), 'base64');
        if (bytes.readInt32LE(0) == transaction_pb_1.TransactionType.SENDMONEYTRANSACTION)
            return tx;
    });
    transactions = transactions.map(function (tx) {
        var bytes = Buffer.from(tx.transactionbytes.toString(), 'base64');
        var amount = utils_1.readInt64(bytes, 121);
        var fee = utils_1.readInt64(bytes, 109);
        var friendAddress = tx.senderaccountaddress == ownAddress ? tx.recipientaccountaddress : tx.senderaccountaddress;
        var type = tx.senderaccountaddress == ownAddress ? 'send' : 'receive';
        return {
            address: friendAddress,
            type: type,
            timestamp: parseInt(tx.arrivaltimestamp) * 1000,
            fee: fee,
            amount: amount,
        };
    });
    return transactions;
}
exports.toUnconfirmedSendMoneyWallet = toUnconfirmedSendMoneyWallet;
function toUnconfirmTransactionNodeWallet(res) {
    var mempoolTx = res.mempooltransactionsList;
    var result = null;
    for (var i = 0; i < mempoolTx.length; i++) {
        var tx = mempoolTx[i].transactionbytes;
        var txBytes = Buffer.from(tx.toString(), 'base64');
        var type = txBytes.slice(0, 4).readInt32LE(0);
        var found = false;
        switch (type) {
            case transaction_pb_1.TransactionType.NODEREGISTRATIONTRANSACTION:
                found = true;
                result = { type: 'Register Node', tx: mempoolTx };
                break;
            case transaction_pb_1.TransactionType.UPDATENODEREGISTRATIONTRANSACTION:
                found = true;
                result = { type: 'Update Node', tx: mempoolTx };
                break;
            case transaction_pb_1.TransactionType.REMOVENODEREGISTRATIONTRANSACTION:
                found = true;
                result = { type: 'Remove Node', tx: mempoolTx };
                break;
            case transaction_pb_1.TransactionType.CLAIMNODEREGISTRATIONTRANSACTION:
                found = true;
                result = { type: 'Claim Node', tx: mempoolTx };
                break;
        }
        if (found)
            break;
    }
    return result;
}
exports.toUnconfirmTransactionNodeWallet = toUnconfirmTransactionNodeWallet;
