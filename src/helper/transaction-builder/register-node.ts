import { base64ToBuffer } from '../converters';
import { writeInt64, writeInt32 } from '../utils';
import { ADDRESS_LENGTH, VERSION } from './constant';
import { BIP32Interface } from 'bip32';

const TRANSACTION_TYPE = new Buffer([2, 0, 0, 0]);

export interface RegisterNodeInterface {
  accountAddress: string;
  fee: number;
  nodePublicKey: string;
  nodeAddress: string;
  funds: number;
}

export function registerNodeBuilder(data: RegisterNodeInterface, poown: Buffer, seed: BIP32Interface): Buffer {
  let bytes: Buffer;

  const timestamp = writeInt64(Math.trunc(Date.now() / 1000));
  const accountAddress = Buffer.from(data.accountAddress, 'utf-8');
  const recipient = new Buffer(ADDRESS_LENGTH);
  const addressLength = writeInt32(ADDRESS_LENGTH);
  const fee = writeInt64(data.fee * 1e8);

  const nodePublicKey = base64ToBuffer(data.nodePublicKey);
  const nodeAddress = Buffer.from(data.nodeAddress, 'utf-8');
  const nodeAddressLength = writeInt32(nodeAddress.length);
  const funds = writeInt64(data.funds * 1e8);
  const bodyLength = writeInt32(
    nodePublicKey.length +
      addressLength.length +
      accountAddress.length +
      nodeAddressLength.length +
      nodeAddress.length +
      funds.length +
      poown.length,
  );

  bytes = Buffer.concat([
    TRANSACTION_TYPE,
    VERSION,
    timestamp,
    addressLength,
    accountAddress,
    addressLength,
    recipient,
    fee,
    bodyLength,
    nodePublicKey,
    addressLength,
    accountAddress,
    nodeAddressLength,
    nodeAddress,
    funds,
    poown,
  ]);

  // ========== NULLIFYING THE ESCROW ===========
  const approverAddressLength = writeInt32(0);
  const commission = writeInt64(0);
  const timeout = writeInt64(0);
  const instructionLength = writeInt32(0);

  bytes = Buffer.concat([bytes, approverAddressLength, commission, timeout, instructionLength]);
  // ========== END NULLIFYING THE ESCROW =========

  const signatureType = writeInt32(0);
  const signature = seed.sign(bytes);
  const bodyLengthSignature = writeInt32(signatureType.length + signature.length);
  return Buffer.concat([bytes, bodyLengthSignature, signatureType, signature]);
}
