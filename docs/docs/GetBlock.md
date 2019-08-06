---
id: getBlock
title: getBlock
sidebar_label: getBlock
---

Returns a block matching the block number or block hash.

### Parameters

* `ChainType` : _int32_ - Indicate the type of chains, _Mainchain_ for flag 0 and _Spinechain_ for flag 1.
* `ID` : _string_ - 1identifer of blocks produced from the first 8 bytes from blockhash
* `Height` : _uint32_ - Fetch block from `n` height.

### Returns

`Promise` returns `Object` - The block object:

  - `ID` : _string_ - identifer of blocks produced from the first 8 bytes from blockhash.
  - `PreviousBlockHash` : _bytes_ - the blockhash of the  the block that connect each block
  - `Height` : _uint32_ - Height relative to the block of transaction was included in.
  - `Timestamp` : _int64_ - Block’s first recorded (arrival) timestamp
  - `BlockSeed` : _bytes_ - A pseudorandom number computed by hashing together the BlockSeed of the previous block and the Account Address of the new Blocksmith.
  - `BlockSignature` : _bytes_ - a hashing that correspond to exactly each string in that block.
  - `CumulativeDifficulty` : _string_ - The total difficulty it would take to create this chain since the Genesis.
  - `SmithScale` : _int64_ - its a multiplier which determines how long the blocks takes to find. the higher the number the more people smithing the blocks.
  - `BlocksmithID` : _bytes_ - the account address of the block creator.
  - `TotalAmount` : _int64_ - the total amount of funds that were sent in this block.
  - `TotalFee` : _int64_ - the total fees thats collected from all transactions in the block.
  - `TotalCoinBase` : _int64_ - the total coins that were created in this block.
  - `Version` : _uint32_ - a version number which may changes if an updated is deployed which changes the protocol.
  - `PayloadLength` : _uint32_ - the number of bytes of all transactions included in the blocks.
  - `PayloadHash` : _bytes_ - the hash of all transactions included in the block.

### Example

```javascript
import zoobc from 'zoobc';

aBlock = () => {
  zoobc.connection('http://18.139.3.139:7001');
  zoobc.getBlock(1, "-9222407558273501032", 5)
    .then(res => {
      this.setState(res => console.log(res));
    })
    .catch(err => {
      this.setState(err => console.log(err));
    });
};
```