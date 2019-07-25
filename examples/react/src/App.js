import { Component } from 'react';
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
    return JSON.stringify(blocks);
  }
}

export default App;
