import { getZBCAddress, readInt64, writeInt32, writeInt64 } from '../utils';
import { ADDRESS_LENGTH, VERSION } from './constant';
import { BIP32Interface } from 'bip32';

const TRANSACTION_TYPE = new Buffer([2, 1, 0, 0]);

export interface UpdateNodeInterface {
  accountAddress: string;
  fee: number;
  nodePublicKey: Buffer;
  nodeAddress: string;
  funds: number;
}

export function updateNodeBuilder(data: UpdateNodeInterface, poown: Buffer, seed?: BIP32Interface): Buffer {
  let bytes: Buffer;

  const timestamp = writeInt64(Math.trunc(Date.now() / 1000));
  const accountAddress = Buffer.from(data.accountAddress, 'utf-8');
  const recipient = new Buffer(ADDRESS_LENGTH);
  const addressLength = writeInt32(ADDRESS_LENGTH);
  const fee = writeInt64(data.fee * 1e8);

  const nodePublicKey = data.nodePublicKey;
  const funds = writeInt64(data.funds * 1e8);
  const bodyLength = writeInt32(nodePublicKey.length + funds.length + poown.length);

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

  if (seed) {
    const signatureType = writeInt32(0);
    const signature = seed.sign(bytes);
    const bodyLengthSignature = writeInt32(signatureType.length + signature.length);
    return Buffer.concat([bytes, bodyLengthSignature, signatureType, signature]);
  } else return bytes;
}

export function readUpdateNodeBytes(txBytes: Buffer) {
  const bodyBytesUpdateNodeLength = txBytes.slice(161, 165).readInt32LE(0);
  const bodyBytes = txBytes.slice(165, 165 + bodyBytesUpdateNodeLength);
  const pubkey = bodyBytes.slice(0, 32);
  const lockAmount = bodyBytes.slice(32, 40);
  const poown = bodyBytes.slice(40, 206);
  const txBody = {
    pubkey: getZBCAddress(pubkey, 'ZNK'),
    lockedAmount: readInt64(lockAmount, 0),
    poown: poown,
  };
  return txBody;
}
