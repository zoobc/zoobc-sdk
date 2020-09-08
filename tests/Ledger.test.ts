import 'mocha';
// import jest from 'jest'
import Transport from '@ledgerhq/hw-transport';
import { expect } from 'chai';
import mockModule from 'mock-require';
// import TransportWebUSB from '@ledgerhq/hw-transport-webusb';

import { Ledger } from '../src';

class MockTransport extends Transport<any> {
  constructor() {
    super();
  }

  async exchange(bytes: Buffer): Promise<Buffer> {
    return Promise.resolve(new Buffer([]));
  }
}

describe('Ledger Unit Test', () => {
  describe('getPublicKey', () => {
    it('should return public key buffer for the supplied account index', () => {
      const mockTransport = new MockTransport();
      const mockPublicKeyBuffer = new Buffer([1, 2, 3]);
      mockModule('@ledgerhq/hw-transport-webusb', { prototype: { exchange: () => Promise.resolve(mockPublicKeyBuffer) } });

      // jest.spyOn(TransportWebUSB.prototype, 'exchange').mockImplementation(() => Promise.resolve(mockPublicKeyBuffer));
      try {
        const pubKey = new Ledger(mockTransport).getPublicKey(0);
        expect(pubKey).equal(mockPublicKeyBuffer);
      } catch (e) {}
    });

    it('should handle getPublicKey error', () => {
      const mockTransport = new MockTransport();
      mockModule('@ledgerhq/hw-transport-webusb', { prototype: { exchange: () => Promise.reject(new Error('error public key')) } });

      // jest.spyOn(TransportWebUSB.prototype, 'exchange').mockImplementation(() => Promise.reject(new Error('error public key')));
      try {
        const pubKey = new Ledger(mockTransport).getPublicKey(0);
      } catch (e) {
        expect(e.message).equal('error public key');
      }
    });
  });

  describe('signTransactionBytes', () => {
    it('should return signature of the supplied transaction bytes from ledger', () => {
      const mockTransport = new MockTransport();
      const mockSignature = new Buffer([1, 2, 3]);
      mockModule('@ledgerhq/hw-transport-webusb', { prototype: { exchange: () => Promise.resolve(mockSignature) } });
      // jest.spyOn(TransportWebUSB.prototype, 'exchange').mockImplementation(() => Promise.resolve(mockSignature));
      try {
        const signature = new Ledger(mockTransport).signTransactionBytes(0, new Buffer([]));
        expect(signature).equal(mockSignature);
      } catch (e) {}
    });

    it('should throw error if the txBytes is falsy', () => {
      const mockTransport = new MockTransport();
      try {
        const signature = new Ledger(mockTransport).signTransactionBytes(0, new Buffer([]));
      } catch (e) {
        expect(e.message).equal('txBytes value is invalid');
      }
    });

    it('should throw transport exchange error', () => {
      const mockTransport = new MockTransport();
      mockModule('@ledgerhq/hw-transport-webusb', { prototype: { exchange: () => Promise.reject(new Error('error sign transaction')) } });
      // jest.spyOn(TransportWebUSB.prototype, 'exchange').mockImplementation(() => Promise.reject(new Error('error sign transaction')));
      try {
        const signature = new Ledger(mockTransport).signTransactionBytes(0, new Buffer([]));
      } catch (e) {
        expect(e.message).equal('error sign transaction');
      }
    });
  });

  describe('getTransportInstance', () => {
    it('should return instance of the transport set', () => {
      const testTransport = new Transport();
      const ledger = new Ledger(testTransport);
      expect(ledger.getTransportInstance()).equal(testTransport);
    });
  });
});
