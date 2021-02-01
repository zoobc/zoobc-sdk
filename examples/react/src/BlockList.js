import React, { useState, useEffect } from 'react';
import zoobc from '../../../';

const BlockList = () => {
  const [blocks, setBlocks] = useState([])
  const [error, setError] = useState(null)
  const [detail, setDetail] = useState(null)

  useEffect(() => {
    /*const hosts = [
      { host: 'http://n0.beta.proofofparticipation.network:7001', name: '168 Testnet' },
    ];
    zoobc.Network.list(hosts)*/

    const groups = [{
      label: 'Beta',
      wkps: [
        'http://n0.beta.proofofparticipation.network:7001',
        'http://n1.beta.proofofparticipation.network:7001',
        'http://n2.beta.proofofparticipation.network:7001',
        'http://n3.beta.proofofparticipation.network:7001',
        'http://n4.beta.proofofparticipation.network:7001',
      ]
    }];
    zoobc.Network.load(groups);

    listBlocks();
    setInterval(() => {
      listBlocks();
    }, 60 * 1000);
  }, [])

  const listBlocks = () => {
    zoobc.Account.getBalance(({ value: 'ZBC_F5YUYDXD_WFDJSAV5_K3Y72RCM_GLQP32XI_QDVXOGGD_J7CGSSSK_5VKR7YML', type: 0 }))
      .then(res => {
        console.log(res);
      })
    /*zoobc.Block
      .getBlocks({height: 0})
      .then(res => setBlocks(res.blocksList))
      .catch(err => {
        console.log(err);
        setError(err)
      })*/
  };

  const onClickBlockId = (id) => {
    zoobc.Block
      .getBlockById(id)
      .then(res => {
        setDetail(res)
        setError(null)
      })
      .catch(err => {
        setError(err)
        setDetail(null)
      })
  }

  const onClickBlockHeight = (height) => {
    zoobc.Block
      .getBlockByHeight(height)
      .then(res => {
        setDetail(res)
        setError(null)
      })
      .catch(err => {
        setError(err)
        setDetail(null)
      })
  }

  return (
    <>
      {!!error && (
        <>
          <div><strong>Error</strong></div>
          <code>{JSON.stringify(error)}</code>
        </>
      )}{!!detail && (
        <>
          <div><strong>Detail</strong></div>
          <code>{JSON.stringify(detail)}</code>
        </>
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
                    <td onClick={() => onClickBlockId(data.block.id)}>
                      {data.block.id}
                    </td>
                    <td>{data.block.previousblockhash}</td>
                    <td onClick={() => onClickBlockHeight(data.block.height)}>
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
  )
}

export default BlockList