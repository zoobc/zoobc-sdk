import Transport from '@ledgerhq/hw-transport';
import TransportWebUSB from '@ledgerhq/hw-transport-webusb';
import { writeInt32 } from './helper/utils';

const CLA = 0x80;
const INS_GET_PUBLIC_KEY = 0x2;
const INS_SIGN_TRANSACTION = 0x3;

const P1_FIRST = 0x00;
const P1_MORE = 0x80;
const P2_LAST = 0x00;
const P2_MORE = 0x80;

const LEDGER_MAX_INPUT_DATA_CHUNK_BYTES = 150;

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
    const data = Buffer.concat([accountIdxBuffer, txBytes]);

    let offset = 0;
    let response = Buffer.from('');
    while (offset < data.length) {
      let chunk = Buffer.from('');
      let p1 = P1_FIRST;
      let p2 = P2_LAST;

      if (data.length - offset < LEDGER_MAX_INPUT_DATA_CHUNK_BYTES) {
        chunk = data.slice(offset, data.length);
      } else {
        chunk = data.slice(offset, offset + LEDGER_MAX_INPUT_DATA_CHUNK_BYTES);
      }

      if (offset === 0) {
        p1 = P1_FIRST;
      } else {
        p1 = P1_MORE;
      }

      const isLastData = offset + chunk.length === data.length;
      if (isLastData) {
        p2 = P2_LAST;
      } else {
        p2 = P2_MORE;
      }

      const chunkLength = writeInt32(chunk.length);

      try {
        response = await this.transport.exchange(
          Buffer.concat([new Buffer([CLA, INS_SIGN_TRANSACTION, p1, p2]), Buffer.concat([chunkLength, chunk])]),
        );
      } catch (e) {
        throw e;
      }
      offset += chunk.length;
    }

    return response.slice(0, response.length - 2);
  }
}
