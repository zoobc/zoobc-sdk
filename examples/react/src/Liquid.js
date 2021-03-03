import React, { useState, useEffect } from 'react';
import { async } from 'rxjs/internal/scheduler/async';

import zoobc, { ZooKeyring } from '../../../';

export default () => {
  const [datas, setDatas] = useState({ total: 0, liquidtransactionsList: [] });

  const data = {
    amount: 2,
    completeMinutes: 2,
    fee: 0.01,
    sender: { value: 'ZBC_F5YUYDXD_WFDJSAV5_K3Y72RCM_GLQP32XI_QDVXOGGD_J7CGSSSK_5VKR7YML', type: 0 },
    recipient: { value: 'ZBC_QWREWSUY_FHG66UD3_SAHOMJLW_5KTDEWZ3_FD3YP3YK_JYGTVD4B_FT7RTWUR', type: 0 },
  };

  const getLiquids = async () => {
    const params = { senderaddress: data.sender };
    const res = await zoobc.Liquid.getList(params);
    setDatas(res);
  };

  const getLiquid = async id => {
    console.log('==id', id);
    const res = await zoobc.Liquid.get(id);
    console.log('==res', res);
  };

  const onSubmit = async () => {
    const seed =
      'stand cheap entire summer claw subject victory supreme top divide tooth park change excite legend category motor text zebra bottom mystery off garage energy';
    const zooKeyring = new ZooKeyring(seed, '');
    const childSeed = zooKeyring.calcDerivationPath(0);

    const res = await zoobc.Liquid.sendLiquid(data, childSeed);
    console.log('==submit liquid', res);
    getLiquids();
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

      getLiquids();
    }
    init();
  }, []);

  return (
    <>
      <h2>liquid transaction</h2>
      <button onClick={onSubmit}>Create Liquid</button>
      <button onClick={getLiquids}>Refresh Liquid</button>

      <p>List Liquid {datas && datas.total}</p>
      {datas &&
        datas.liquidtransactionsList &&
        datas.liquidtransactionsList.map((item, idx) => {
          return (
            <label key={idx}>
              {idx} - id = {item.id} <button onClick={() => getLiquid(item.id)}>Detail Liquid</button>
            </label>
          );
        })}
    </>
  );
};
