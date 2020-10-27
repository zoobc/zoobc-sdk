import {
  writeInt64,
  writeInt32,
  getZBCAddress,
  readInt64,
  ZBCAddressToBytes,
  hasEscrowTransaction,
  accountToBytes,
  parseAccountAddress,
} from '../utils';
import { VERSION } from './constant';
import { BIP32Interface } from 'bip32';
import { generateTransactionHash } from '../wallet/MultiSignature';
import { EscrowTransactionInterface } from './send-money';
import { Account } from '../interfaces';

const TRANSACTION_TYPE = new Buffer([2, 0, 0, 0]);

export interface RegisterNodeInterface extends EscrowTransactionInterface {
  accountAddress: Account;
  fee: number;
  nodePublicKey: Buffer;
  nodeAddress: string;
  funds: number;
}

export function registerNodeBuilder(data: RegisterNodeInterface, poown: Buffer, seed?: BIP32Interface): Buffer {
  let bytes: Buffer;

  const timestamp = writeInt64(Math.trunc(Date.now() / 1000));
  const sender = accountToBytes(data.accountAddress);
  const recipient = writeInt32(2);
  const fee = writeInt64(data.fee * 1e8);

  const nodePublicKey = data.nodePublicKey;
  const funds = writeInt64(data.funds * 1e8);
  const bodyLength = writeInt32(nodePublicKey.length + sender.length + funds.length + poown.length);

  bytes = Buffer.concat([TRANSACTION_TYPE, VERSION, timestamp, sender, recipient, fee, bodyLength, nodePublicKey, sender, funds, poown]);

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

export function readNodeRegistrationBytes(txBytes: Buffer) {
  const bodyBytesRegisterNodeLength = txBytes.slice(161, 165).readInt32LE(0);
  const bodyBytesRegister = txBytes.slice(165, 165 + bodyBytesRegisterNodeLength);
  const pubkeyRegister = bodyBytesRegister.slice(0, 32);
  const accountaddress = bodyBytesRegister.slice(36, 102).toString();
  const lockedBalance = bodyBytesRegister.slice(102, 110);
  const txBody = {
    nodepublickey: getZBCAddress(pubkeyRegister, 'ZNK'),
    accountaddress: parseAccountAddress(accountaddress),
    lockedbalance: readInt64(lockedBalance, 0),
  };
  return txBody;
}
