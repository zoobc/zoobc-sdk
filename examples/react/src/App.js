import React from 'react';
import { BlockServiceClient } from './schema/service/block_grpc_web_pb';
import { GetBlocksRequest } from './schema/model/block_pb';
import './app.css';

class App extends React.Component {
  state = {
    blocks: {
      blocksList: [],
    },
  };

  componentDidMount() {
    this.getTestBlock().then(data => this.setState({ blocks: data }));
  }

  getTestBlock() {
    const block = new BlockServiceClient('http://18.139.3.139:7001', null, null);
    const request = new GetBlocksRequest();
    request.setChaintype(0);
    request.setLimit(10);
    request.setHeight(1);
    return new Promise((resolve, reject) => {
      block.getBlocks(request, null, (err, response) => {
        if (err) return reject(err);
        resolve(response.toObject());
      });
    });
  }

  render() {
    const { blocks } = this.state;
    return (
      <table>
        <thead>
          <th>Id</th>
          <th>Previous Hash</th>
          <th>Height</th>
          <th>Timestamp</th>
          <th>Version</th>
        </thead>
        <tbody>
          {blocks &&
            blocks.blocksList.length > 0 &&
            blocks.blocksList.map((block, key) => {
              return (
                <tr key={key}>
                  <td>{block.id}}</td>
                  <td>{block.previousblockhash}</td>
                  <td>{block.height}</td>
                  <td>{block.timestamp}</td>
                  <td>{block.version}</td>
                </tr>
              );
            })}
        </tbody>
      </table>
    );
  }
}

export default App;
