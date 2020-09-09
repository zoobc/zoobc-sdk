import 'mocha';
import { expect } from 'chai';

import zoobc from '../src';

const hosts = [
  { host: 'https://n0.alpha.proofofparticipation.network:8443', name: 'Alpha Testnet' },
  { host: 'http://85.90.246.90:7001', name: '168 Testnet' },
  { host: 'https://explorer-nodes.alpha.proofofparticipation.network', name: 'Alpha' },
];

describe('Network Unit Testing :', () => {
  it('should return array of object', () => {
    zoobc.Network.list(hosts);
    expect(hosts).to.be.an('array');
  });

  it('should return object from selected', async () => {
    zoobc.Network.set(0);
    const resp = await zoobc.Network.selected();
    expect(resp).to.be.an('object');
  });

  it('should return host value is 172.104.47.168:7000', async () => {
    zoobc.Network.set(1);
    const resp = await zoobc.Network.selected();
    expect(resp.host).to.equal(hosts[1].host);
  });
});
