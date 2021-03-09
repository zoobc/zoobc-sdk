import React, { useState, useEffect } from 'react';
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

  const dataStop = {
    accountAddress: {
			value:
				"ZBC_F5YUYDXD_WFDJSAV5_K3Y72RCM_GLQP32XI_QDVXOGGD_J7CGSSSK_5VKR7YML",
			type: 0,
		},
    fee: 0.5,
  }

	const getLiquids = async () => {
		const params = { senderaddress: data.sender };
		const res = await zoobc.Liquid.getList(params);
		setDatas(res);
	};

  const getLiquid = async id => {
    const res = await zoobc.Liquid.get(id);
    console.log('==Detail Liquid', res);
  };

  const onSubmit = async () => {
    const seed =
      'stand cheap entire summer claw subject victory supreme top divide tooth park change excite legend category motor text zebra bottom mystery off garage energy';
    const zooKeyring = new ZooKeyring(seed, '');
    const childSeed = zooKeyring.calcDerivationPath(0);

		const res = await zoobc.Liquid.sendLiquid(data, childSeed);
    console.log(res)
		getLiquids();
	};

  const onStop = async (id) => {
		const seed =
			"stand cheap entire summer claw subject victory supreme top divide tooth park change excite legend category motor text zebra bottom mystery off garage energy";
		const zooKeyring = new ZooKeyring(seed, "");
		const childSeed = zooKeyring.calcDerivationPath(0);
    dataStop.transactionId = id
    // console.log(dataStop)
		const res = await zoobc.Liquid.sendLiquidStop(dataStop, childSeed);
    console.log('==res', res)
		getLiquids();
	};

  const getTrx = async () => {
    const res = await zoobc.Transactions.getList();

    const liquid = res.transactions.filter(x => x.transactionType === 6);
    console.log('liquid = ', liquid);
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
      <h2>liquid transaction</h2>
      <button onClick={onSubmit}>Create Liquid</button>
      <button onClick={getLiquids}>Refresh Liquid</button>
      <button onClick={getTrx}>Get Trx</button>

			<table>
				<thead>
					<tr>
						<th>Id</th>
						<th>Sender</th>
						<th>Recipient</th>
						<th>Fee</th>
						<th>Message</th>
						<th>Amout</th>
						<th>Complete Minutes</th>
            <th>Status</th>
					</tr>
				</thead>
				<tbody>
					{datas &&
						datas.liquidtransactionsList &&
						datas.liquidtransactionsList.map((item, idx) => {
							console.log(item);
							return (
								<tr key={idx}>
									<td onClick={() => getLiquid(item.id)}>{item.id}</td>
									<td>{item.sender.value}</td>
									<td>{item.recipient.value}</td>
									<td>{item.fee}</td>
									<td>{item.message}</td>
									<td>{item.amount}</td>
									<td>{item.completeMinutes}</td>
                  <td>{item.status}</td>
                  <td><button onClick={() => onStop(item.id)}>stop liquid tx</button></td>
								</tr>
							);
						})}
				</tbody>
			</table>
		</>
	);
};
