import zoobc from '../src';
import { expect } from 'chai';

const encrypted: string[] = [
  'U2FsdGVkX1959m8HZ+HQ6SeOw6IPx7I+3gU+WQsAsDHALaRITW7r0vqfD0NMbOzld4OtdxPVqlh4vM63Th5VRl4afCp7CeJK1ab95fC3XEihtjlMCuRwVI8rF+yLkM78/JFLvqeohePC9A3rUnzgsZyJTa88bOmtLo6K3hVUZJYloctTOtfacNovsDJt6UqEyizkjREx4e7cA/aJETyMthOsnZ83VLShjcrAorLWBP4=',
  // 'U2FsdGVkX195lfBQBwwz0lShqPc3MQ0CutJ0jSvAaWGe7xLEXKR2DhU2UuBXOihcMG8IesbXj6ObhuQ01hPK4g0epnMfXO/Zggu3S5vXvKNPkcrQQQSMfxUd4UwHbuqx60XM1BA88ECoOQSCv0wqzsFivcQ91xTzwsTNlNNvX+RhyyAZozXgpEBNYOV2s8jnVYy5o1gjzpK/MqiBcrfBCopFQUTKFIo2NaomGhkxYK8=',
  // 'U2FsdGVkX18rNcRa9fUMPPlvzEnI3H/m0a5P4hI7p9IgcARdfjW+c9Vmf/fLtGnB8yl4wNfz1Efhey1A6Ec8UoxnXJs3W1Ef4Q0ptIfq0JAR9D1psG5U4wuBHamUQ3XLXvmCDxuW+uC3gHl2mzpQFu7Aon9GS6tibJ1eWqe1asdvKcD6Y1xSY7mRMvCQxWlMdvK1mD5K4QJNKd92vKue8vMNb6Z+HeEyBMMOMTDg9iI=',
];

const passphrases: string[] = [
  'stand cheap entire summer claw subject victory supreme top divide tooth park change excite legend category motor text zebra bottom mystery off garage energy',
  // 'slam muffin nose wild lesson trouble speed lawsuit dress decrease famous hope elder easy ability gesture place vital surface inject detail wolf knee grit',
  // 'potato elbow sausage tell choice daughter boring shield wine subject panic quantum stage uniform sauce palm child tuna exist candy day helmet cart spend',
];

describe('Wallet Unit Testing: ', () => {
  describe('encryptPassphrase', () => {
    it('should return a base64 string', () => {
      passphrases.forEach(p => {
        const encrypt = zoobc.Wallet.encryptPassphrase(p, '12345');

        expect(encrypt).to.be.an('string');
        expect(encrypt).to.match(/^[-A-Za-z0-9+=]{1,50}|=[^=]|={3,}$/);
      });
    });
  });

  describe('decryptPassphrase', () => {
    it('should return a string of a passphrase', async () => {
      encrypted.forEach((enc, i) => {
        const passphrase = zoobc.Wallet.decryptPassphrase(enc, '12345');

        expect(passphrase).to.be.an('string');
        expect(passphrase).to.equal(passphrases[i]);
      });
    });
  });
});
