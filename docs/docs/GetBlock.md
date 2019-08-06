---
id: getBlock
title: getBlock
sidebar_label: getBlock
---

Returns a block matching the block number or block hash.

## Parameters

* `ChainType` : _int32_ - Indicate the type of chains, _Mainchain_ for flag 0 and _Spinechain_ for flag 1.

* `Limit` : _uint32_ - Number of block to fetch.

* `Height` : _uint32_ - Fetch block from `n` height.


## Returns

`Promise` returns `Object` - The block object:

  - `ID` : _string_ - Little endian representation of transaction bytes .FullHash: computed on tx bytes +body bytes (without signature).
  - `PreviousBlockHash` : _bytes_ -
  - `Height` : _uint32_ - Height relative to the block of transaction was included in.
  - `Timestamp` : _int64_ - Block’s first recorded (arrival) timestamp
  - `BlockSeed` : _bytes_ - A pseudorandom number computed by hashing together the BlockSeed of the previous block and the Account Address of the new Blocksmith.
  - `BlockSignature` : _bytes_ -
  - `CumulativeDifficulty` : _string_ - The total difficulty it would take to create this chain since the Genesis.
  - `SmithScale` : _int64_ -
  - `BlocksmithID` : _bytes_ -
  - `TotalAmount` : _int64_ -
  - `TotalFee` : _int64_ -
  - `TotalCoinBase` : _int64_ -
  - `Version` : _uint32_ -
  - `PayloadLength` : _uint32_ -
  - `PayloadHash` : _bytes_ -

## Example

```javascript
import zoobc from 'zoobc';

listBlocks = () => {
  zoobc.connection('http://18.139.3.139:7001');
  zoobc.getBlocks(0, 5, 1)
    .then(res => {
      this.setState({ blocks: res.blocksList });
    })
    .catch(err => {
      this.setState({ error: err });
    });
};
```