# ZooBC-SDK for JavaScript

ZooBC-SDK is a small set of libraries written in JavaScript, making it easy to implement/integrate applications so that they connect with the P2P API of the nodes in the blockchain and the Web API of the explorer servers.

![npm](https://img.shields.io/npm/v/zoobc-sdk-js.svg)
![License](https://img.shields.io/badge/License-Apache%202.0-blue.svg)
[![CircleCI](https://circleci.com/gh/zoobc/zoobc-sdk-js.svg?style=svg&circle-token=8a1610a487c652b7165e501f7d4c814fe0e34e12)](https://circleci.com/gh/zoobc/zoobc-sdk-js)

## Start using ZooBC-SDK for JavaScript

For instructions on how to use the JavaScript web and mobile client framework for a project, please refer to these documents:

  * [AngularJs](examples/angular/README.md)
  * [Ionic](examples/ionic/README.md)
  * [ReactJs](examples/react/README.md)
  * [React Native](examples/reactnative/README.md)
  * [VueJs](examples/vue/README.md)

## Start developing ZooBC-SDK for JavaScript

### Installing

**Step 1**
```bash
# Clone this repository
$ git clone https://github.com/zoobc/zoobc-sdk-js.git

# Go to 'zoobc-sdk-js' directory
$ cd zoobc-sdk-js

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

### General Usage

Add 'zoobc' packages to your project by executing:
```bash
$ npm install zoobc
or
$ yarn add zoobc
```

Here's an example of basic usage for connection:
```bash
import zoobc from 'zoobc';

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
```

### License

This project is licensed under the Apache License - see the [LICENSE](LICENSE) file for details