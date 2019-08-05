---
id: getBlock
title: getBlock
sidebar_label: getBlock
---

Returns a block matching the block number or block hash.

### Parameters

* `ChainType` -

* `Limit` -

* `Height` - 


### Returns

`Promise` returns `Object` - The block object:

  - `ID`- _String_: Block ID
  - `PreviousBlockHash` - _String_: PreviousBlockHash definition...
  - `Height` - _Number_: Height definition...
  - `Timestamp` - _String_: Timestamp definition...
  - `BlockSeed` - _String_: BlockSeed definition...
  - `BlockSignature` - _String_: BlockSignature definition...
  - `CumulativeDifficulty` - _String_: CumulativeDifficulty definition...
  - `SmithScale` - _String_: SmithScale definition...
  - `BlocksmithID` - _String_: BlocksmithID definition...
  - `TotalAmount` - _String_: TotalAmount definition...
  - `TotalFee` - _String_: TotalFee definition...
  - `TotalCoinBase` - _String_: TotalCoinBasedefinition...
  - `Version` - _Number_: Version definition...
  - `PayloadLength` - _Number_: PayloadLength definition...
  - `PayloadHash` - _String_: PayloadHash definition...
  - `Transactions` - _String_: Transactions definition...

### Example

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