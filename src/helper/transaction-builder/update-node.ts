import { writeInt32, writeInt64 } from '../utils';
import { ADDRESS_LENGTH, VERSION } from './constant';
import { BIP32Interface } from 'bip32';
import { generateTransactionHash } from '../wallet/MultiSignature';

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
    const txHash = generateTransactionHash(bytes);
    const txHashBytes = Buffer.from(txHash, 'base64');
    const signature = seed.sign(txHashBytes);
    const bodyLengthSignature = writeInt32(signatureType.length + signature.length);
    return Buffer.concat([bytes, bodyLengthSignature, signatureType, signature]);
  } else return bytes;
}
