---
id: getTransaction
title: getTransaction
sidebar_label: getTransaction
---

Returns a transaction matching the requested transaction hash.

## Parameters

* `ID` : _string_ - Identifier of transaction.

## Returns

  - `ID` : _uint32_ - Identifier of transaction.
  - `BlockID` : _string_ - The hash of the current Block where the transaction included in.
  - `Height` : _uint32_ - The height of the current block where the transaction data located.
  - `SenderAccountType` : _uint32_ - The address type of the sender account.
  - `SenderAccountAddress` : _string_ - Address of sender.
  - `RecipientAccountType` : _uint32_ - The address type of the recipient account.
  - `RecipientAccountAddress` : _string_ - Address of recipient.
  - `TransationType` : _uint32_ - Type of transaction.
  - `Fee` : _string_ - The amount of currency that imposed for doing the transaction
  - `Timestamp` : _int64_ - The timestamp included in the transaction.
  - `TransactionHash` : _string_ - The hash of all transactions data.
  - `TransactionBodyLength` : _uint32_ - The length that the transaction body.
  - `TransactionBodyBytes` : _string_ - The raw data of the transaction body.
  - `Version` : _uint32_ - A version number that can be changed if the protocol number is changed.
  - `Signature` : _string_ - Digital signature from the sender.
  - `nodeRegistrationTransactionBody` : _object_
  <!-- need further discussion with the core to specify each field for each transaction. -->
  - - `NodePublicKey` : _string_ - The public key of the node that registered.
    - `AccountType` : _uint32_ - The address type of the node's owner.
    - `AccountAddress` : _string_ - The node address of the node's owner.
    - `RegistrationHeight` : _string_ - The block height which the node register.
    - `NodeAddress` : _string_ - The ip address of the node.
    - `LockedBalance` : _string_ - The number of funds locked by the node owner.
    - `Poown` : _string_ - The poof of ownership message for this node.
  - `TransactionBody` : _string_ -

## Example
```javascript
singleTransaction = () => {
  zoobc.connection('http://18.139.3.139:7001');
  zoobc.getTransaction(1902297852732397426)
    .then(res => {
      console.log(res);
    })
    .catch(err => {
      console.log(err);
    });
};
```
