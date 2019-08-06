---
id: getBlocks
title: getBlocks
sidebar_label: getBlocks
---

Returns a block matching the block number or block hash.

## Parameters

* `ChainType` : _int32_ - Indicate the type of chains, _Mainchain_ for flag 0 and _Spinechain_ for flag 1.
* `Limit` : _uint32_ - Number of blocks to fetch.
* `Height` : _uint32_ - Fetch block from `n` height.


## Returns

`Promise` returns `Object` - The blocks object:

  - `ChainType` : _int32_ - Indicate the type of chains, _Mainchain_ for flag 0 and _Spinechain_ for flag 1.
  - `Limit` : _uint32_ - Number of blocks to fetch.
  - `Height` : _uint32_ - Fetch block from `n` height.
  - `ID` : _string_ - Identifier of block produced from the first 8 bytes from blockhash.
  - `PreviousBlockHash` : _bytes_ - The blockhash of the block that connect each block.
  - `Height` : _uint32_ - Height relative to the block of transaction was included in.
  - `Timestamp` : _int64_ - Block’s first recorded (arrival) timestamp.
  - `BlockSeed` : _bytes_ - A pseudorandom number computed by hashing together the BlockSeed of the previous block and the Account Address of the new Blocksmith.
  - `BlockSignature` : _bytes_ - A hashing that correspond to exactly each string in that block.
  - `CumulativeDifficulty` : _string_ - The total difficulty it would take to create this chain since the Genesis.
  - `SmithScale` : _int64_ - Its a multiplier which determines how long the blocks takes to create. The higher the number the more people smithing the blocks.
  - `BlocksmithID` : _bytes_ - The account address of the block creator.
  - `TotalAmount` : _int64_ - The total amount of funds that were sent in this block.
  - `TotalFee` : _int64_ - The total fees thats collected from all transactions in the block.
  - `TotalCoinBase` : _int64_ - The total coins that were created in this block.
  - `Version` : _uint32_ - A version number which may changes if an update is deployed which changed the protocol.
  - `PayloadLength` : _uint32_ - The number of bytes of all transactions included in the blocks.
  - `PayloadHash` : _bytes_ - The hash of all transactions included in the block.


## Example

```javascript
import zoobc from 'zoobc';

listBlocks = () => {
  zoobc.connection('http://18.139.3.139:7001');
  zoobc.getBlocks(0, 5, 1)
    .then(res => {
      console.log(res.blocksList);
    })
    .catch(err => {
      console.log(err);
    });
};

