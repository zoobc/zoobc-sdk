import { accountToBytes, parseAccountAddress, readInt64, writeInt32, writeInt64, ZBCAddressToBytes } from '../utils';
import { VERSION } from './constant';
import { BIP32Interface } from 'bip32';
import { ZBCTransaction } from '../wallet/Transaction';
import { generateTransactionHash } from '../wallet/MultiSignature';
import { TransactionType } from '../../../grpc/model/transaction_pb';
import { Account } from '../interfaces';
import { addEscrowBytes } from './escrow-transaction';

const TRANSACTION_TYPE = writeInt32(TransactionType.SENDMONEYTRANSACTION);

export interface SendMoneyInterface extends EscrowTransactionInterface {
  sender: Account;
  recipient: Account;
  fee: number;
  amount: number;
}

export interface EscrowTransactionInterface {
  approverAddress?: Account;
  commission?: number;
  timeout?: number;
  instruction?: string;
}

export function sendMoneyBuilder(data: SendMoneyInterface, seed?: BIP32Interface): Buffer {
  let bytes: Buffer;

  const timestamp = writeInt64(Math.trunc(Date.now() / 1000));
  const sender = accountToBytes(data.sender);
  const recipient = accountToBytes(data.recipient);
  const fee = writeInt64(data.fee * 1e8);
  const amount = writeInt64(data.amount * 1e8);
  const bodyLength = writeInt32(amount.length);

  bytes = Buffer.concat([TRANSACTION_TYPE, VERSION, timestamp, sender, recipient, fee, bodyLength, amount]);

  // Add Escrow Bytes
  bytes = addEscrowBytes(bytes, data);

  const message = writeInt32(0);
  bytes = Buffer.concat([bytes, message]);

  if (seed) {
    const txHash = ZBCAddressToBytes(generateTransactionHash(bytes));
    const signature = seed.sign(txHash);
    return Buffer.concat([bytes, signature]);
  } else return bytes;
}

export function readSendMoneyBytes(txBytes: Buffer, offset: number): any {
  const amount = parseInt(readInt64(txBytes, offset));
  return { amount };
}
