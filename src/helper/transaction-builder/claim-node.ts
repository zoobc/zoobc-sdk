import { writeInt64, writeInt32, getZBCAddress, ZBCAddressToBytes, hasEscrowTransaction, accountToBytes } from '../utils';
import { VERSION } from './constant';
import { BIP32Interface } from 'bip32';
import { generateTransactionHash } from '../wallet/MultiSignature';
import { EscrowTransactionInterface } from './send-money';
import { Account } from '../interfaces';

const TRANSACTION_TYPE = new Buffer([2, 3, 0, 0]);

export interface ClaimNodeInterface extends EscrowTransactionInterface {
  accountAddress: Account;
  fee: number;
  nodePublicKey: Buffer;
  nodeAddress: string;
}

export function claimNodeBuilder(data: ClaimNodeInterface, poown: Buffer, seed?: BIP32Interface) {
  let bytes: Buffer;

  const timestamp = writeInt64(Math.trunc(Date.now() / 1000));
  const sender = accountToBytes(data.accountAddress);
  const recipient = writeInt32(2);

  const fee = writeInt64(data.fee * 1e8);

  const nodePublicKey = data.nodePublicKey;
  const bodyLength = writeInt32(nodePublicKey.length + poown.length);

  bytes = Buffer.concat([TRANSACTION_TYPE, VERSION, timestamp, sender, recipient, fee, bodyLength, nodePublicKey, poown]);

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

export function readClaimNodeBytes(txBytes: Buffer) {
  const bodyBytesClaimNodeLength = txBytes.slice(161, 165).readInt32LE(0);
  const bodyBytesClaim = txBytes.slice(165, 165 + bodyBytesClaimNodeLength);
  const pubkeyClaim = bodyBytesClaim.slice(0, 32);
  const poownClaim = bodyBytesClaim.slice(32, 198);
  const txBody = {
    nodepublickey: getZBCAddress(pubkeyClaim, 'ZNK'),
    poown: poownClaim,
  };
  return txBody;
}
