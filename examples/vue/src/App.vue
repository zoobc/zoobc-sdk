<template>
  <div id="app">
    <table>
      <thead>
        <th>Id</th>
        <th>Previous Hash</th>
        <th>Height</th>
        <th>Timestamp</th>
        <th>Version</th>
      </thead>
      <tbody>
        <tr>
          <td>a</td>
          <td>b</td>
          <td>c</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import zoobc from 'zoobc'

export default {
  name: 'app',
  state: {
    blocks: [],
    error: ''
  },

  beforeCreate() {
    this.listBlocks
  },

  listBlocks() {
    zoobc.connection('http://18.139.3.139:7001')
    zoobc.getBlocks(0, 5, 1)
      .then(res => {
        this.setState({ blocks: res.blocksList })
      })
      .catch(err => {
        this.setState({ error: err })
      })
    }
}

</script>