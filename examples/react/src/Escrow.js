import React, { useState, useEffect } from 'react';
import moment from 'moment';
import zoobc, { ZooKeyring } from '../../../';

export default () => {
  const [datas, setDatas] = useState({ total: 0, escrowList: [] });

  const data = {
    amount: 2,
    fee: 0.017,
    sender: { value: 'ZBC_F5YUYDXD_WFDJSAV5_K3Y72RCM_GLQP32XI_QDVXOGGD_J7CGSSSK_5VKR7YML', type: 0 },
    recipient: { value: 'ZBC_QWREWSUY_FHG66UD3_SAHOMJLW_5KTDEWZ3_FD3YP3YK_JYGTVD4B_FT7RTWUR', type: 0 },
    approverAddress: { value: 'ZBC_F6CRZPOG_C42A7M37_WRL2EVBV_KA5PKBGI_SBGVZHMH_VIFZ7CMQ_VMOFWD3P', type: 0 },
    commission: 0.1,
    instruction: 'Testing',
    message: '',
    timeout: moment()
      .add(2, 'hours')
      .utc()
      .unix(),
  };

  const getEscrows = async () => {
    const params = { sender: data.sender };
    const res = await zoobc.Escrows.getList(params);
    // const params = { address: data.sender };
    // const res = await zoobc.Transactions.getList(params);
    console.log('==res', res);
    // if (res && res.transactions) {
    //   const escrows = res.transactions.filter(f => f.escrow !== undefined);
    //   console.log('==escrows', escrows);
    // }
    setDatas(res);
  };

  const onSubmit = async () => {
    const seed =
      'stand cheap entire summer claw subject victory supreme top divide tooth park change excite legend category motor text zebra bottom mystery off garage energy';
    const zooKeyring = new ZooKeyring(seed, '');
    const childSeed = zooKeyring.calcDerivationPath(0);

    const res = await zoobc.Transactions.SendZBC(data, childSeed);
    console.log('==Send Escrow', res);
  };

  useEffect(() => {
    function init() {
      const groups = [
        {
          label: 'Beta',
          // wkps: ['http://172.104.62.181:7001', 'http://45.79.35.137:7001', 'http://23.92.27.48:7001'],
          // wkps: [
          //   'http://n0.alpha.proofofparticipation.network:7001',
          //   'http://n1.alpha.proofofparticipation.network:7001',
          //   'http://n2.alpha.proofofparticipation.network:7001',
          //   'http://n3.alpha.proofofparticipation.network:7001',
          //   'http://n4.alpha.proofofparticipation.network:7001',
          //   'http://n5.alpha.proofofparticipation.network:7001',
          // ],
          wkps: [
            'http://n0.beta.proofofparticipation.network:7001',
            'http://n1.beta.proofofparticipation.network:7001',
            'http://n2.beta.proofofparticipation.network:7001',
            'http://n3.beta.proofofparticipation.network:7001',
            'http://n4.beta.proofofparticipation.network:7001',
          ],
        },
      ];
      zoobc.Network.load(groups);
      // getLiquids();
    }
    init();
  }, []);

  return (
    <>
      <h2>Escrow Transaction</h2>
      <button onClick={onSubmit}>Create Escrow</button>
      <button onClick={getEscrows}>Get Escrows</button>

      <h4>Escrow List ({datas && datas.total})</h4>
      <ul>
        {datas &&
          datas.escrowList &&
          datas.escrowList.map(i => {
            return (
              <li key={i.id}>
                ID: {i.id} - Block: {i.blockHeight} - Instruction: {i.instruction}
              </li>
            );
          })}
      </ul>
    </>
  );
};
