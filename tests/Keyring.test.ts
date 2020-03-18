import 'mocha';
import { expect } from 'chai';

import { ZooKeyring } from '../src';

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

  describe('calcDerivationPath', () => {
    it('should return BIP32Interface object that contain expected properties value', async () => {
      const numWords = 12;
      const passphare = await ZooKeyring.generateRandomPhrase(numWords);
      const result = new ZooKeyring(passphare, 'p4ssphr4se');
      expect(result).to.be.an('object');
    });
  });
});
