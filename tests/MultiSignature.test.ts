import zoobc from '../src';
import { expect } from 'chai';
import { MultiSigAddress } from '../src/MultiSignature';

const multisigs: MultiSigAddress[] = [
  {
    participants: ['AFiTqqX99kYXjLFJJ2AWuzKK5zxYUT1Pn0p3s6lutkai', 'iSJt3H8wFOzlWKsy_UoEWF_OjF6oymHMqthyUMDKSyxb'],
    nonce: 1,
    minSigs: 2,
  },
  {
    participants: ['AFiTqqX99kYXjLFJJ2AWuzKK5zxYUT1Pn0p3s6lutkai', 'iSJt3H8wFOzlWKsy_UoEWF_OjF6oymHMqthyUMDKSyxb'],
    nonce: 2,
    minSigs: 2,
  },
];

const base64s: string[] = [
  'AgAAAAEAAAACAAAALAAAAEFGaVRxcVg5OWtZWGpMRkpKMkFXdXpLSzV6eFlVVDFQbjBwM3M2bHV0a2FpLAAAAGlTSnQzSDh3Rk96bFdLc3lfVW9FV0ZfT2pGNm95bUhNcXRoeVVNREtTeXhi',
  'AgAAAAIAAAACAAAALAAAAEFGaVRxcVg5OWtZWGpMRkpKMkFXdXpLSzV6eFlVVDFQbjBwM3M2bHV0a2FpLAAAAGlTSnQzSDh3Rk96bFdLc3lfVW9FV0ZfT2pGNm95bUhNcXRoeVVNREtTeXhi',
];

describe('MultiSignature Unit Testing: ', () => {
  describe('createMultiSigAddress', () => {
    it('should return a base64 address string', () => {
      multisigs.forEach((multisig, i) => {
        const base64 = zoobc.MultiSignature.generateMultiSigInfo(multisig).toString('base64');

        expect(base64).to.be.equal(base64s[i]);
      });
    });
  });
});
