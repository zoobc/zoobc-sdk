# ZooBC

![npm](https://img.shields.io/npm/v/zoobc-sdk-js.svg)
![License](https://img.shields.io/badge/License-Apache%202.0-blue.svg)

A small set of libraries written in different programming languages, making it easy to implement / integrate applications so that they connect with the P2P API of the nodes in the blockchain and the Web API of the explorer servers.

## Install

```bash
$ npm install zoobc or yarn add zoobc
```

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