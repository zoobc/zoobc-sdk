/* eslint-disable react/react-in-jsx-scope */
import React, { Component } from 'react';
import zoobc from '../../../';
import './app.css';

class App extends Component {
  state = { blocks: [], error: '', detail: null };

  componentDidMount() {
    zoobc.Network.selected = 'http://85.90.246.90:8002'
    this.listBlocks();
  }

  listBlocks = () => {
    zoobc.Block
      .getBlocks(0, 5)
      .then(res => this.setState({ blocks: res.blocksList }))
      .catch(err => this.setState({ error: err }))
  };

  onClickBlockId = (id) => {
    zoobc.Block
      .getBlockById(id)
      .then(res => this.setState({detail: res}))
      .catch(err => this.setState({ error: err }))
  }

  onClickBlockHeight = (height) => {
    zoobc.Block
      .getBlockByHeight(height)
      .then(res => this.setState({detail: res}))
      .catch(err => this.setState({ error: err }))
  }

  render() {
    const { blocks } = this.state;
    return (
      <>
      {!!this.state.detail && (
        <code>{JSON.stringify(this.state.detail)}</code>
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
                    <td onClick={() => this.onClickBlockId(data.block.id)}>
                      {data.block.id}
                    </td>
                    <td>{data.block.previousblockhash}</td>
                    <td onClick={() => this.onClickBlockHeight(data.block.height)}>
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
    );
  }
}

export default App;
