import Transport from '@ledgerhq/hw-transport';
import TransportWebUSB from '@ledgerhq/hw-transport-webusb';
import { writeInt32 } from './helper/utils';

const CLA = 0x80;
const INS_GET_PUBLIC_KEY = 0x2;
const INS_SIGN_TRANSACTION = 0x3;

export class Ledger {
  private transport: Transport<any>;

  constructor(transport: Transport<any>) {
    this.transport = transport;
  }

  static getUSBTransport(): Promise<Transport> {
    return TransportWebUSB.create();
  }

  getTransportInstance(): Transport<any> {
    return this.transport;
  }

  async getPublicKey(accountIndex: number): Promise<Buffer> {
    if (!this.transport) {
      throw Error('transport is not set');
    }
    const accountIdxBuffer = writeInt32(accountIndex);
    const totalLength = writeInt32(accountIdxBuffer.length);
    const data = Buffer.concat([totalLength, accountIdxBuffer]);
    const response = await this.transport.exchange(Buffer.concat([new Buffer([CLA, INS_GET_PUBLIC_KEY, 0x00, 0x00]), data]));
    return response.slice(0, response.length - 2);
  }

  async signTransactionBytes(accountIndex: number, txBytes: Buffer): Promise<Buffer> {
    if (!this.transport) {
      throw Error('transport is not set');
    }
    if (!txBytes || txBytes.length === 0) {
      throw Error('txBytes value is invalid');
    }

    const accountIdxBuffer = writeInt32(accountIndex);
    const totalLength = txBytes.length + accountIdxBuffer.length;
    const txByteLengthBuffer = writeInt32(totalLength);
    const data = Buffer.concat([txByteLengthBuffer, accountIdxBuffer, txBytes]);
    const response = await this.transport.exchange(Buffer.concat([new Buffer([CLA, INS_SIGN_TRANSACTION, 0x00, 0x00]), data]));
    return response.slice(0, response.length - 2);
  }
}
