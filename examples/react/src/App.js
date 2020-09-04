import React, { useState, useEffect } from 'react';
import GetPublicKey from './GetPublicKey'
import zoobc from '../../../';
import './app.css';
import SignSendMoney from './SignSendMoney';


const App = () => {
  const [blocks, setBlocks] = useState([])
  const [error, setError] = useState(null)
  const [detail, setDetail] = useState(null)

  useEffect(() => {
    const hosts = [
      { host: 'http://85.90.246.90:8002', name: '168 Testnet' },
    ];
    zoobc.Network.list(hosts)
    listBlocks();
  }, [])

  const listBlocks = () => {
    zoobc.Block
      .getBlocks({height: 0})
      .then(res => setBlocks(res.blocksList))
      .catch(err => setError(err))
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

  return <SignSendMoney/>

  // return (
  //   <>
  //   <GetPublicKey/>
  //     {!!error && (
  //       <>
  //         <div><strong>Error</strong></div>
  //         <code>{JSON.stringify(error)}</code>
  //       </>
  //     )}{!!detail && (
  //       <>
  //         <div><strong>Detail</strong></div>
  //         <code>{JSON.stringify(detail)}</code>
  //       </>
  //     )}
  //       {/* <table>
  //         <thead>
  //           <tr>
  //             <th>Id</th>
  //             <th>Previous Hash</th>
  //             <th>Height</th>
  //             <th>Timestamp</th>
  //             <th>Version</th>
  //           </tr>
  //         </thead>
  //         <tbody>
  //           {blocks.length > 0 &&
  //             blocks.map((data, key) => {
  //               return (
  //                 <tr key={key}>
  //                   <td onClick={() => onClickBlockId(data.block.id)}>
  //                     {data.block.id}
  //                   </td>
  //                   <td>{data.block.previousblockhash}</td>
  //                   <td onClick={() => onClickBlockHeight(data.block.height)}>
  //                     {data.block.height}
  //                   </td>
  //                   <td>{data.block.timestamp}</td>
  //                   <td>{data.block.version}</td>
  //                 </tr>
  //               );
  //             })}
  //         </tbody>
  //       </table> */}
  //     </>
  // )
}

export default App;
