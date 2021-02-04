import { addressToBytes, generateTransactionHash, getZBCAddress, readInt64, writeInt32, writeInt64, ZBCAddressToBytes } from '../utils';
import { ADDRESS_LENGTH, POOWN_LENGTH, VERSION } from './constant';
import { BIP32Interface } from 'bip32';
import { EscrowTransactionInterface } from './send-money';
import { Address } from '../interfaces';
import { TransactionType } from '../../../grpc/model/transaction_pb';
import { AccountType } from '../../../grpc/model/accountType_pb';
import { addEscrowBytes } from './escrow-transaction';

const TRANSACTION_TYPE = writeInt32(TransactionType.UPDATENODEREGISTRATIONTRANSACTION);

export interface UpdateNodeInterface extends EscrowTransactionInterface {
  accountAddress: Address;
  fee: number;
  nodePublicKey: Buffer;
  nodeAddress: string;
  funds: number;
  message?: string;
}

export function updateNodeBuilder(data: UpdateNodeInterface, poown: Buffer, seed?: BIP32Interface): Buffer {
  let bytes: Buffer;

  const timestamp = writeInt64(Math.trunc(Date.now() / 1000));
  const sender = addressToBytes(data.accountAddress);
  const recipient = writeInt32(AccountType.EMPTYACCOUNTTYPE);
  const fee = writeInt64(data.fee * 1e8);

  const nodePublicKey = data.nodePublicKey;
  const funds = writeInt64(data.funds * 1e8);
  const bodyLength = writeInt32(nodePublicKey.length + funds.length + poown.length);

  bytes = Buffer.concat([TRANSACTION_TYPE, VERSION, timestamp, sender, recipient, fee, bodyLength, nodePublicKey, funds, poown]);

  // Add Escrow Bytes
  bytes = addEscrowBytes(bytes, data);

  // Add message
  let message = writeInt32(0);
  if (data.message) {
    message = writeInt32(data.message.length);
    Buffer.concat([message, Buffer.from(data.message)]);
  }

  bytes = Buffer.concat([bytes, message]);

  if (seed) {
    const txHash = ZBCAddressToBytes(generateTransactionHash(bytes));
    const signature = seed.sign(txHash);
    return Buffer.concat([bytes, signature]);
  } else return bytes;
}

export function readUpdateNodeBytes(txBytes: Buffer, offset: number) {
  const nodepublickey = getZBCAddress(txBytes.slice(offset, offset + ADDRESS_LENGTH), 'ZNK');
  offset += ADDRESS_LENGTH;

  const lockedbalance = parseInt(readInt64(txBytes, offset));
  offset += 8;

  const poown = txBytes.slice(offset, offset + POOWN_LENGTH);
  return { nodepublickey, lockedbalance, poown };
}
