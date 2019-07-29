/* eslint-disable react/react-in-jsx-scope */
import React, { Component } from 'react';
import zoobc from 'zoobc';
import './app.css';

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
        console.log(res)
        this.setState({ blocks: res.blocksList });
      })
      .catch(err => {
        this.setState({ error: err });
      });
  };

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
          {blocks.length > 0 &&
            blocks.map((block, key) => {
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
