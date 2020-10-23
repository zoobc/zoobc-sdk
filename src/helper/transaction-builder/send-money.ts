import { accountToBytes, parseAccountAddress, readInt64, writeInt32, writeInt64, ZBCAddressToBytes } from '../utils';
import { VERSION } from './constant';
import { BIP32Interface } from 'bip32';
import { ZBCTransaction } from '../wallet/Transaction';
import { Account } from '../interfaces';
import { generateTransactionHash } from '../wallet/MultiSignature';
import { AccountType } from '../../../grpc/model/accountType_pb';
import { TransactionType } from '../../../grpc/model/transaction_pb';

const TRANSACTION_TYPE = writeInt32(TransactionType.SENDMONEYTRANSACTION);

export interface SendMoneyInterface {
  sender: Account;
  recipient: Account;
  fee: number;
  amount: number;
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

  if (data.approverAddress && data.commission && data.timeout && data.instruction) {
    // escrow bytes
    const approverAddress = accountToBytes(data.approverAddress);
    const commission = writeInt64(data.commission * 1e8);
    const timeout = writeInt64(data.timeout);
    const instruction = Buffer.from(data.instruction, 'utf-8');
    const instructionLength = writeInt32(instruction.length);

    bytes = Buffer.concat([bytes, approverAddress, commission, timeout, instructionLength, instruction]);
  } else {
    const approverAddress = writeInt32(AccountType.EMPTYACCOUNTTYPE);
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

export function readPostTransactionBytes(txBytes: Buffer) {
  const timestamp = readInt64(txBytes.slice(5, 13), 0);
  const senderAddressLength = txBytes.slice(13, 17).readInt32LE(0);
  const senderAddress = txBytes.slice(17, 17 + senderAddressLength).toString();
  const recipientAddressLength = txBytes.slice(83, 87).readInt32LE(0);
  const recipientAddress = txBytes.slice(87, 87 + recipientAddressLength).toString();
  const txFee = readInt64(txBytes.slice(153, 161), 0);

  let transaction: ZBCTransaction = {
    timestamp: parseInt(timestamp) * 1000,
    sender: parseAccountAddress(senderAddress),
    recipient: parseAccountAddress(recipientAddress),
    fee: parseInt(txFee),
    escrow: false,
  };
  return transaction;
}

export function readEscrowBytes(txBytes: Buffer, transaction: ZBCTransaction) {
  const approverAddressLength = txBytes.slice(173, 177).readInt32LE(0);
  const approverAddress = txBytes.slice(177, 177 + approverAddressLength);
  const int64Length = 8;
  const commission = readInt64(txBytes.slice(243, 243 + int64Length), 0);
  const timeout = readInt64(txBytes.slice(251, 251 + int64Length), 0);
  const instructionLength = txBytes.slice(259, 263).readInt32LE(0);
  const instruction = txBytes.slice(263, 263 + instructionLength);
  transaction.approverAddress = parseAccountAddress(approverAddress);
  transaction.commission = parseInt(commission);
  transaction.timeout = parseInt(timeout);
  transaction.instruction = instruction.toString();
  transaction.escrow = true;
  return transaction;
}

export function readSendMoneyBytes(txBytes: Buffer) {
  const bodyBytesSendMoneyLength = txBytes.slice(161, 165).readInt32LE(0);
  const bodyBytesSendMoney = txBytes.slice(165, 165 + bodyBytesSendMoneyLength);
  const bodyBytes = {
    amount: readInt64(bodyBytesSendMoney, 0),
  };
  return bodyBytes;
}
