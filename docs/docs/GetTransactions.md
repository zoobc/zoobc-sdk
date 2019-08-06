---
id: getTransactions
title: getTransactions
sidebar_label: getTransactions
---

Returns an array of transactions according to a maximum set by the limit requested at and starts from the offset.

### Parameters

* `Limit` : _uin32_ - limiting how many transactions to be fetched at.
* `Offset`: _uint32_ - the hash of which transaction started to fetched at.

### Returns

  - `Total`: _string_ - Number of transactions in total.
  - `Count`: _uint32_ - Number of transactions returned.

`Promise` returns `Object` - A transaction object its hash `TransactionHash` :

  - `ID` : _uint32_ - Identifier of transaction.
  - `BlockID` : _string_ - The hash of the current Block where the transaction included in.
  - `Height` : _uint32_ - The height of the current block where the transaction data located.
  - `SenderAccountType` : _uint32_ - The address type of the sender account.
  - `SenderAccountAddress` : _string_ - Address of sender.
  - `RecipientAccountType` : _uint32_ - The address type of the recipient account.
  - `RecipientAccountAddress` : _string_ - Address of recipient.
  - `TransactionType` : _uint32_ - Type of transaction.
  - `Fee` : _string_ - The amount of currency that imposed for doing the transaction.
  - `Timestamp` : _int64_ - The timestamp included in the transaction.
  - `TransactionHash` : _string_ - The hash of all transactions data.
  - `TransactionBodyLength` : _uint32_ - The length that the transaction body.
  - `TransactionBodyBytes` : _bytes_ - The raw data of the transaction body.
  - `Version` : _uint32_ - A version number that can be changed if the protocol number is changed.
  - `Signature` : _bytes_ - Digital signature from the sender.
  - `TransactionBody` : _string_
    - `SendMoneyTransactionBody` : _object_
      - `Amount` : _int64_ - The amount of the funds the transaction sent.
    - `NodeRegistrationTransactionBody` : _object_
      - `NodePublicKey` : _string_ - The public key of the node that registered.
      - `AccountType` : _uint32_ - The address type of the node's owner.
      - `AccountAddress` : _string_ - The node address of the node's owner.
      - `RegistrationHeight` : _string_ - The block height which the node register.
      - `NodeAddress` : _string_ - The ip address of the node.
      - `LockedBalance` : _string_ - The number of funds locked by the node owner.
      - `Poown` : _object_ - The proof of ownership message for this node.
        - `MessageBytes` : _bytes_ - The raw data format of the message.
        - `Signature` : _bytes_ - The digital signature on the raw data by the node.

### Example
```
import zoobc from 'zoobc';

listTransactions = () => {
  zoobc.connection('http://18.139.3.139:7001');
  zoobc.getTransactions(5, 4)
    .then(res => {
      console.log(res.TransactionsList );
    })
    .catch(err => {
      console.log(err);
    });
};
```
