import 'mocha';
import { expect } from 'chai';

import zoobc from '../src';

const hosts = [
  { host: 'https://n0.alpha.proofofparticipation.network:8443', name: 'Alpha Testnet' },
  { host: '172.104.47.168:7000', name: '168 Testnet' },
];

describe('Network Unit Testing :', () => {
  it('Set Network should return array of object', async () => {
    zoobc.Network.list(hosts);
    await expect(hosts).to.be.an('array');
  });

  it('Network selected should return object', async () => {
    zoobc.Network.set(0);
    const resp = await zoobc.Network.selected();
    await expect(resp).to.be.an('object');
  });

  it('Set network should return value 172.104.47.168:7000', async () => {
    zoobc.Network.set(1);
    const resp = await zoobc.Network.selected();
    await expect(resp.host).to.equal('172.104.47.168:7000');
  });
});
