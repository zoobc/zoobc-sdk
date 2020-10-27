import { writeInt64, writeInt32, getZBCAddress, ZBCAddressToBytes, hasEscrowTransaction, accountToBytes } from '../utils';
import { VERSION } from './constant';
import { BIP32Interface } from 'bip32';
import { generateTransactionHash } from '../wallet/MultiSignature';
import { EscrowTransactionInterface } from './send-money';
import { Account } from '../interfaces';

const TRANSACTION_TYPE = new Buffer([2, 2, 0, 0]);

export interface RemoveNodeInterface extends EscrowTransactionInterface {
  accountAddress: Account;
  fee: number;
  nodePublicKey: Buffer;
}

export function removeNodeBuilder(data: RemoveNodeInterface, seed?: BIP32Interface): Buffer {
  let bytes: Buffer;

  const timestamp = writeInt64(Math.trunc(Date.now() / 1000));
  const sender = accountToBytes(data.accountAddress);
  const recipient = writeInt32(2);
  const fee = writeInt64(data.fee * 1e8);

  const nodePublicKey = data.nodePublicKey;
  const bodyLength = writeInt32(nodePublicKey.length);

  bytes = Buffer.concat([TRANSACTION_TYPE, VERSION, timestamp, sender, recipient, fee, bodyLength, nodePublicKey]);

  if (data.approverAddress && data.commission && data.timeout && data.instruction) {
    // escrow bytes
    bytes = hasEscrowTransaction(bytes, data);
  } else {
    // escrow bytes default value
    const approverAddress = writeInt32(2);
    bytes = Buffer.concat([bytes, approverAddress]);
  }

  const message = writeInt32(0);
  bytes = Buffer.concat([bytes, message]);

  if (seed) {
    const txHash = ZBCAddressToBytes(generateTransactionHash(bytes));
    const signature = seed.sign(txHash);
    return Buffer.concat([bytes, signature]);
  } else return bytes;
}

export function readRemoveNodeRegistrationBytes(txBytes: Buffer) {
  const bodyBytesRemoveNodeLength = txBytes.slice(161, 165).readInt32LE(0);
  const bodyBytesRemove = txBytes.slice(165, 165 + bodyBytesRemoveNodeLength);
  const txBody = {
    nodepublickey: getZBCAddress(bodyBytesRemove, 'ZNK'),
  };
  return txBody;
}
