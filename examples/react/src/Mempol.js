import React, { useState, useEffect } from 'react';
import zoobc from '../../../';

export default () => {
  const getMempol = async () => {
    const params = { address: { value: 'ZBC_F5YUYDXD_WFDJSAV5_K3Y72RCM_GLQP32XI_QDVXOGGD_J7CGSSSK_5VKR7YML', type: 0 } };
    const res = await zoobc.Mempool.getList(params);
    console.log('==List Mempol', res);
  };

  useEffect(() => {
    function init() {
      const groups = [
        {
          label: 'Beta',
          wkps: ['http://172.104.62.181:7001', 'http://45.79.35.137:7001', 'http://23.92.27.48:7001'],
          // wkps: [
          //   'http://n0.alpha.proofofparticipation.network:7001',
          //   'http://n1.alpha.proofofparticipation.network:7001',
          //   'http://n2.alpha.proofofparticipation.network:7001',
          //   'http://n3.alpha.proofofparticipation.network:7001',
          //   'http://n4.alpha.proofofparticipation.network:7001',
          //   'http://n5.alpha.proofofparticipation.network:7001',
          // ],
          // wkps: [
          //   'http://n0.beta.proofofparticipation.network:7001',
          //   'http://n1.beta.proofofparticipation.network:7001',
          //   'http://n2.beta.proofofparticipation.network:7001',
          //   'http://n3.beta.proofofparticipation.network:7001',
          //   'http://n4.beta.proofofparticipation.network:7001',
          // ],
        },
      ];
      zoobc.Network.load(groups);
      // getLiquids();
    }
    init();
  }, []);

  return (
    <>
      <h2>mempol transaction</h2>
      <button onClick={getMempol}>Get Mmepol</button>
    </>
  );
};
