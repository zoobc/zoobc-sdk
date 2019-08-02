/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  FlatList
} from 'react-native';

import zoobc from 'zoobc';

class App extends React.Component {
  state = { blocks: [], error: '' };

  componentDidMount() {
    this.listBlocks();
  }

  listBlocks = () => {
    zoobc.connection('http://18.139.3.139:7001');
    zoobc.httpTransport(zoobc.xhrTransport())
    zoobc
      .getBlocks(0, 5, 1)
      .then(res => {
        this.setState({ blocks: res.blocksList });
      })
      .catch(err => {
        this.setState({ error: err.message });
      });
  };

  render() {
    return (
      <View style={styles.container}>
        <FlatList
          data={this.state.blocks}
          renderItem={({item}) => (
            <View>
              <Text>ID: {item.id}</Text>
              <Text>Timestamp: {item.timestamp}</Text>
              <Text>Height: {item.height}</Text>
              <Text>Version: {item.version}</Text>
            </View>
          )}
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 22,
  },
});

export default App;
