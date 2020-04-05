<template>
  <div class="app">
    <h1>Example Using SDK on Vue JS</h1>
    <table style="">
      <thead>
        <th>Id</th>
        <th>Previous Hash</th>
        <th>Height</th>
        <th>Timestamp</th>
        <th>Version</th>
      </thead>
      <tbody>
        <tr :key="block.block.id" v-for="block in blocks">
          <td @click="onClickBlockId(block.block.id)" class="click">{{ block.block.id }}</td>
          <td>{{ block.block.previousblockhash }}</td>
          <td>{{ block.block.height }}</td>
          <td>{{ block.block.timestamp }}</td>
          <td>{{ block.block.version }}</td>
        </tr>
      </tbody>
    </table>
    <br />
    <template v-if="!!detail">
      <h2>Detail Block</h2>
      <br />
      {{ detail }}
    </template>
  </div>
</template>

<script>
import zoobc from 'zoobc-sdk';
export default {
  name: 'app',
  data() {
    return {
      blocks: [],
      error: '',
      detail: null,
      hosts: [
        { host: '//85.90.246.90:8002', name: 'Demo Testnet 1' },
        { host: '/n1.alpha.proofofparticipation.network:8080', name: 'Alpha Testnet' },
        { host: '//45.79.39.58:8002', name: 'Demo Testnet 2' },
      ],
    };
  },
  methods: {
    listBlocks() {
      zoobc.Block.getBlocks(0, 5, 1)
        .then(res => {
          this.blocks = res.blocksList;
        })
        .catch(err => {
          this.error = err;
        });
    },
    onClickBlockId(id) {
      zoobc.Block.getBlockById(id)
        .then(res => {
          this.detail = res;
        })
        .catch(err => {
          this.error = err;
        });
    },
  },
  mounted() {
    zoobc.Network.list(this.hosts);
    zoobc.Network.set(0);
    this.listBlocks();
  },
};
</script>

<style scoped>
.app {
  font-family: arial, sans-serif;
}

.app h1 {
  font-weight: bold;
  text-align: center;
}

table {
  font-family: arial, sans-serif;
  border-collapse: collapse;
  width: 100%;
}

th,
td {
  border: 1px solid #000;
  text-align: left;
  padding: 8px;
}
.click {
  cursor: pointer;
}
.click:hover {
  opacity: 0.5;
}
</style>
