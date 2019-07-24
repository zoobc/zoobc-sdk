const path = require('path');
const { BlockService } = require('../../dist');
const schema = path.resolve(__dirname, '../zoobc-schema');

var nabila = new BlockService(schema, '18.139.3.139:7000');

nabila
  .getBlock({ ChainType: 0, Limit: 5, Height: 1 })
  .then(data => {
    console.log('data: ', data);
  })
  .catch(err => {
    console.log('err: ', err);
  });
