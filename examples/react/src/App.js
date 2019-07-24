import React from 'react';
import JSONPretty from 'react-json-prettify';
import { githubGist } from 'react-json-prettify/dist/themes';
import { BlockServiceClient } from './schema/service/block_grpc_web_pb';
import { GetBlocksRequest } from './schema/model/block_pb';

class App extends React.Component {
  state = {
    blocks: {},
  };

  componentDidMount() {
    this.getTestBlock().then(data => this.setState({ blocks: data }));
  }

  getTestBlock() {
    const block = new BlockServiceClient('http://18.139.3.139:8080', null, null);
    const request = new GetBlocksRequest();
    return new Promise((resolve, reject) => {
      block.getBlocks(request, null, (err, response) => {
        if (err) return reject(err);
        resolve(response.toObject());
      });
    });
  }

  render() {
    return <JSONPretty theme={githubGist} json={this.state.blocks} padding={2} />;
  }
}

export default App;
