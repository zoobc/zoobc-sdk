![Screenshot](assets/images/ZooBC-SDK.gif)

# ZooBC-SDK

![npm](https://img.shields.io/npm/v/zoobc-sdk-js.svg)
![License](https://img.shields.io/badge/License-Apache%202.0-blue.svg)
[![CircleCI](https://circleci.com/gh/zoobc/zoobc-sdk.svg?style=svg&circle-token=8a1610a487c652b7165e501f7d4c814fe0e34e12)](https://circleci.com/gh/zoobc/zoobc-sdk)

ZooBC-SDK is a small set of libraries written with TypeScript and compiled to be JavaScript, making it easy to implement / integrate applications so that they connect with the P2P API of the nodes in the blockchain for the Web API of the explorer servers and wallet.

## Start using ZooBC-SDK

For instructions on how to use web and mobile for a project, please refer to these documents:

  * [AngularJs](examples/angular)
  * [Ionic](examples/ionic)
  * [ReactJs](examples/react)
  * [React Native](https://github.com/zoobc/zoobc-thumbwar.git)
  * [VueJs](examples/vue)

## Start developing ZooBC-SDK

### Installing

**Step 1**
```bash
# Clone this repository
$ git clone https://github.com/zoobc/zoobc-sdk.git

# Go to 'zoobc-sdk' directory
$ cd zoobc-sdk

# Install 'node_modules' packages
$ npm install
or
$ yarn install
```
**Step 2**
```bash
# Run proto generator
$ ./protogen.sh
```
**Step 3**
```bash
# Unit testing
$ npm run test
or
$ yarn test
```

### General Usage

Add 'zoobc' packages to your project by executing:
```bash
$ npm install zoobc
or
$ yarn add zoobc
```

Here's an example of basic usage for connection:
```bash
import React, { useState, useEffect } from 'react';
import zoobc from 'zoobc';
import './app.css';

const App = () => {
  const [blocks, setBlocks] = useState([])
  const [error, setError] = useState(null)
  const [detail, setDetail] = useState(null)

  useEffect(() => {
    const hosts = [
      { host: 'http://85.90.246.90:8002', name: '168 Testnet' },
    ];
    zoobc.Network.list(hosts)
    listBlocks();
  }, [])

  const listBlocks = () => {
    zoobc.Block
      .getBlocks({height: 0})
      .then(res => setBlocks(res.blocksList))
      .catch(err => setError(err))
  };

  const onClickBlockId = (id) => {
    zoobc.Block
      .getBlockById(id)
      .then(res => {
        setDetail(res)
        setError(null)
      })
      .catch(err => {
        setError(err)
        setDetail(null)
      })
  }

  const onClickBlockHeight = (height) => {
    zoobc.Block
      .getBlockByHeight(height)
      .then(res => {
        setDetail(res)
        setError(null)
      })
      .catch(err => {
        setError(err)
        setDetail(null)
      })
  }

  return (
    <>
      {!!error && (
        <>
          <div><strong>Error</strong></div>
          <code>{JSON.stringify(error)}</code>
        </>
      )}{!!detail && (
        <>
          <div><strong>Detail</strong></div>
          <code>{JSON.stringify(detail)}</code>
        </>
      )}
        <table>
          <thead>
            <tr>
              <th>Id</th>
              <th>Previous Hash</th>
              <th>Height</th>
              <th>Timestamp</th>
              <th>Version</th>
            </tr>
          </thead>
          <tbody>
            {blocks.length > 0 &&
              blocks.map((data, key) => {
                return (
                  <tr key={key}>
                    <td onClick={() => onClickBlockId(data.block.id)}>
                      {data.block.id}
                    </td>
                    <td>{data.block.previousblockhash}</td>
                    <td onClick={() => onClickBlockHeight(data.block.height)}>
                      {data.block.height}
                    </td>
                    <td>{data.block.timestamp}</td>
                    <td>{data.block.version}</td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </>
  )
}

export default App;
```

### License

This project is licensed under the Apache License - see the [LICENSE](LICENSE) file for details