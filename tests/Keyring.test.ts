import 'mocha';
import { expect } from 'chai';

import { ZooKeyring } from '../src';

const testCase: any = [
  {
    passphrase:
      'stand cheap entire summer claw subject victory supreme top divide tooth park change excite legend category motor text zebra bottom mystery off garage energy',
    lang: 'english',
    result: true,
  },
  {
    passphrase:
      'slam muffin nose wild lesson trouble speed lawsuit dress decrease famous hope elder easy ability gesture place vital surface inject detail wolf knee grit',
    lang: 'english',
    result: true,
  },
  {
    passphrase:
      'potato elbow sausage tell choice daughter boring shield wine subject panic quantum stage uniform sauce palm child tuna exist candy day helmet cart spend',
    lang: 'english',
    result: true,
  },
  {
    passphrase:
      'はみがき　はいそう　ちいさい　しはい　へこむ　しほう　こくさい　うろこ　けなみ　あみもの　うすぐらい　すぼん　とっきゅう　すこし　はおる　しあさって　にがて　そつえん　あずき　そぼく　さんいん　たいる　えんちょう　くやくしょ',
    lang: 'japanese',
    result: true,
  },
  {
    passphrase:
      'potato elbow sausage tell choice daughter boring shield wine subject panic quantum stage uniform sauce palm child tuna exist candy day helmet spend cart',
    lang: 'english',
    result: false,
  },
];

describe('Keyring Unit Testing :', () => {
  describe('generateRandomPhrase', () => {
    it('should return string that contain 12', async () => {
      const numWords = 12;
      const result = await ZooKeyring.generateRandomPhrase(numWords);
      expect(result.split(' ').length).to.be.equal(numWords);
    });

    it('should return string that contain 24', async () => {
      const numWords = 24;
      const result = await ZooKeyring.generateRandomPhrase(numWords);
      expect(result.split(' ').length).to.be.equal(numWords);
    });

    it('should return error if number word not 12 neither 24', async () => {
      const numWords = 9;
      const result = await ZooKeyring.generateRandomPhrase(numWords);
      expect(result).to.be.equal('numWords only 12 or 24');
    });
  });

  describe('isPassphraseValid', () => {
    it('should return as expected result in the test case', async () => {
      testCase.forEach(async (c: any) => {
        const result = await ZooKeyring.isPassphraseValid(c.passphrase, c.lang);
        expect(result).to.equal(c.result);
      });
    });
  });

  describe('calcDerivationPath', () => {
    it('should return BIP32Interface object', async () => {
      const numWords = 12;
      const passphrase = await ZooKeyring.generateRandomPhrase(numWords);
      const result = new ZooKeyring(passphrase, 'p4ssphr4se');
      expect(result).to.be.an('object');
    });

    it('should having property bip32RootKey', async () => {
      const numWords = 12;
      const passphrase = await ZooKeyring.generateRandomPhrase(numWords);
      const result = new ZooKeyring(passphrase, 'p4ssphr4se');
      expect(result).to.be.have.property('bip32RootKey');
    });

    it('should having property seed', async () => {
      const numWords = 12;
      const passphrase = await ZooKeyring.generateRandomPhrase(numWords);
      const result = new ZooKeyring(passphrase, 'p4ssphr4se');
      expect(result).to.be.have.property('seed');
    });

    it('should having property coinName', async () => {
      const numWords = 12;
      const passphrase = await ZooKeyring.generateRandomPhrase(numWords);
      const result = new ZooKeyring(passphrase, 'p4ssphr4se');
      expect(result).to.be.have.property('coinName');
    });
  });
});
