import zoobc, { RequestType, ZooKeyring } from '../src';
import { expect } from 'chai';
import { ProofOfOwnership } from '../grpc/model/proofOfOwnership_pb';
import { FakeTransportBuilder } from '@improbable-eng/grpc-web-fake-transport';
import { grpc } from '@improbable-eng/grpc-web';

var auths: string[] = [];

describe('Poown Unit Testing: ', () => {
  describe('createAuth', () => {
    it('should return base64 string with 108 length', () => {
      const passphrases = [
        'stand cheap entire summer claw subject victory supreme top divide tooth park change excite legend category motor text zebra bottom mystery off garage energy',
        'slam muffin nose wild lesson trouble speed lawsuit dress decrease famous hope elder easy ability gesture place vital surface inject detail wolf knee grit',
      ];
      passphrases.forEach((p, i) => {
        const keyring = new ZooKeyring(p, 'p4ssphr4se');
        const childSeed = keyring.calcDerivationPath(0);

        const auth = zoobc.Poown.createAuth(RequestType.GETPROOFOFOWNERSHIP, childSeed);
        expect(auth).to.be.an('string');
        expect(auth).to.be.length(108);

        auths[i] = auth;
      });
    });
  });

  describe('request', () => {
    it('should return bytes of array (buffer)', async () => {
      const poownResponse = new ProofOfOwnership();
      const transport = new FakeTransportBuilder().withMessages([poownResponse]).build();
      grpc.setDefaultTransport(transport);

      auths.forEach(async auth => {
        const poown = await zoobc.Poown.request(auth, '0.0.0.0:3000');
        expect(poown).to.be.instanceof(Buffer);
      });
    });
  });
});
