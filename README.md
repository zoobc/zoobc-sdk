# ZooBC

![npm](https://img.shields.io/npm/v/zoobc-sdk-js.svg)
![License](https://img.shields.io/badge/License-Apache%202.0-blue.svg)
[![CircleCI](https://circleci.com/gh/zoobc/zoobc-sdk-js.svg?style=svg&circle-token=8a1610a487c652b7165e501f7d4c814fe0e34e12)](https://circleci.com/gh/zoobc/zoobc-sdk-js)

A small set of libraries written in different programming languages, making it easy to implement / integrate applications so that they connect with the P2P API of the nodes in the blockchain and the Web API of the explorer servers.

## Install

```bash
$ npm install zoobc or yarn add zoobc
```

## Issue

Please Install This Package Globally For Windows User

```bash
$ npm install -g win-node-env
```

## How To Run Example

- [React](https://github.com/zoobc/zoobc-sdk-js/tree/develop/examples/react)
- [Angular](https://github.com/zoobc/zoobc-sdk-js/tree/develop/examples/angular)
- [Vue](https://github.com/zoobc/zoobc-sdk-js/tree/develop/examples/vue)
- [Ionic](https://github.com/zoobc/zoobc-sdk-js/tree/develop/examples/ionic)

## Usage

```bash
import React, { Component } from 'react';
import zoobc from 'zoobc';

class App extends Component {
  state = { blocks: [], error: '' };

  componentDidMount() {
    this.listBlocks();
  }

  listBlocks = () => {
    zoobc.connection('http://18.139.3.139:7001');
    zoobc
      .getBlocks(0, 5, 1)
      .then(res => {
        this.setState({ blocks: res.blocksList });
      })
      .catch(err => {
        this.setState({ error: err });
      });
  };

  render() {
    const { blocks } = this.state;
    return blocks;
  }
}

export default App;

```

## License

This project is licensed under the Apache License - see the [LICENSE](LICENSE) file for details