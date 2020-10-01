import { writeInt64, writeInt32, getZBCAddress } from '../utils';
import { ADDRESS_LENGTH, VERSION } from './constant';
import { BIP32Interface } from 'bip32';

const TRANSACTION_TYPE = new Buffer([2, 2, 0, 0]);

export interface RemoveNodeInterface {
  accountAddress: string;
  fee: number;
  nodePublicKey: Buffer;
}

export function removeNodeBuilder(data: RemoveNodeInterface, seed: BIP32Interface): Buffer {
  let bytes: Buffer;

  const timestamp = writeInt64(Math.trunc(Date.now() / 1000));
  const accountAddress = Buffer.from(data.accountAddress, 'utf-8');
  const recipient = new Buffer(ADDRESS_LENGTH);
  const addressLength = writeInt32(ADDRESS_LENGTH);
  const fee = writeInt64(data.fee * 1e8);

  const nodePublicKey = data.nodePublicKey;
  const bodyLength = writeInt32(nodePublicKey.length);

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

export function readRemoveNodeRegistrationBytes(txBytes: Buffer, bytesConverted: any) {
  const bodyBytesRemoveNodeLength = txBytes.slice(161, 165).readInt32LE(0);
  const bodyBytesRemove = txBytes.slice(165, 165 + bodyBytesRemoveNodeLength);
  bytesConverted.bodyBytes = {
    pubkey: getZBCAddress(bodyBytesRemove, 'ZNK'),
  };
  bytesConverted.recipientAddress = '';
  return bytesConverted;
}
