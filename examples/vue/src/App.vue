<template>
  <div>
    <table style="">
      <thead>
        <th>Id</th>
        <th>Previous Hash</th>
        <th>Height</th>
        <th>Timestamp</th>
        <th>Version</th>
      </thead>
      <tbody>
        <tr v-for="block in blocks" :key="block.id">
          <td>{{block.id}}</td>
          <td>{{block.previousblockhash}}</td>
          <td>{{block.height}}</td>
          <td>{{block.timestamp}}</td>
          <td>{{block.version}}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import zoobc from 'zoobc'

export default {
  name: 'app',
  data () {
    return {
      blocks: [],
      error: ''
    }
  },

  created() {
    this.listBlocks()
  },

  methods: {
    listBlocks() {
      zoobc.connection('http://18.139.3.139:7001')
      zoobc.getBlocks(0, 5, 1)
        .then(res => {
          this.blocks = res.blocksList
        })
        .catch(err => {
          this.error = err
        })
      }
  }
}

</script>

<style scoped>
  table {
    font-family: arial, sans-serif;
    border-collapse: collapse;
    width: 100%;
  }

  th, td {
    border: 1px solid #000;
    text-align: left;
    padding: 8px;
  }
</style>
