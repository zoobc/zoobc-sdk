---
id: getTransactions
title: getTransactions
sidebar_label: getTransactions
---

### Parameters

* `Limit` : _uin32_ - limiting how many transactions to be fetched at.
* `Offset`: _uint32_ - the hash of which transaction started to fetched at.

### Returns

  - `Total`: _string_ -
  - `Count`: _uint32_ - Total transaction that fetched.
  - `Version`: _uint32_ - a version number that cna be changed if the protocol number is changed.
  - `ID` : _string_ - Little endian representation of transaction bytes .FullHash: computed on tx bytes +body bytes (without signature)
  - `BlockID`: _string_ - the hash of the current Block where the transaction included in.
  - `Height` : _uint32_ - the Height of the current block where the transaction data located.
  - `SenderAccountType`: _uint32_ - the address type of the sender account.
  - `SenderAccountAddress`: _string_ - Address of sender.
  - `RecipientAccountType`: _uint32_ - the address type of the recipient account
  - `RecipientAccountAddress`: _string_ - Address of recipient.
  - `TransationType`: _uint32_ - type of transaction.
  - `Fee`: _string_ - the amount of currency that imposed for doing the transaction
  - `Timestamp` : _int64_ - the timestamp included in the transaction.
  - `TransactionHash`: _string -the hash of all transactions data.
  - `TransactionBodyLength`: _uint32_- the length that the transaction body.
  - `TransactionBodyBytes`: _string_ - the raw data of the transaction body
  - `Signature` : _string_ - digital signature from the sender
  - `nodeRegistrationTransactionBody`: _object_ - .need further discussion with the core to specify each field for each transaction.
  - - `NodePublicKey`: _string_ - the public key of the node that registered.
    - `AccountType`: _uint32_ - the address type of the node's owner.
    - `AccountAddress`: _string_ - the address node of the node's owner.
    - `RegistrationHeight`: _string_ - the block height which the node register.
    - `NodeAddress`: _string_ - the ip address of the node.
    - `LockedBalance`: _string_ - the number of funds locked by the node owner.
    - `Poown`: _null_ - the poof of ownership message for this node.
  - `TransactionBody`: _string_ -

### Example
```javascript
listTransactions = () => {
  zoobc.connection('http://18.139.3.139:7001');
  zoobc.getTransactions("1902297852732397426")
    .then(res => {
      this.setState({ transactions: res.TransactionsList });
    })
    .catch(err => {
      this.setState({ error: err });
    });
};
```
