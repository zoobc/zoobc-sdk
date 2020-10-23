import { accountToBytes, getZBCAddress, readInt64, writeInt32, writeInt64, ZBCAddressToBytes } from '../utils';
import { ADDRESS_LENGTH, VERSION } from './constant';
import { BIP32Interface } from 'bip32';
import { TransactionType } from '../../../grpc/model/transaction_pb';
import { Account } from '../interfaces';
import { AccountType } from '../../../grpc/model/accountType_pb';
import { generateTransactionHash } from '../..';

const TRANSACTION_TYPE = writeInt32(TransactionType.UPDATENODEREGISTRATIONTRANSACTION);

export interface UpdateNodeInterface {
  accountAddress: Account;
  fee: number;
  nodePublicKey: Buffer;
  nodeAddress: string;
  funds: number;
}

export function updateNodeBuilder(data: UpdateNodeInterface, poown: Buffer, seed?: BIP32Interface): Buffer {
  let bytes: Buffer;

  const timestamp = writeInt64(Math.trunc(Date.now() / 1000));
  const accountAddress = accountToBytes(data.accountAddress);
  const recipient = writeInt32(AccountType.EMPTYACCOUNTTYPE);
  const fee = writeInt64(data.fee * 1e8);

  const nodePublicKey = data.nodePublicKey;
  const funds = writeInt64(data.funds * 1e8);
  const bodyLength = writeInt32(nodePublicKey.length + funds.length + poown.length);

  bytes = Buffer.concat([TRANSACTION_TYPE, VERSION, timestamp, accountAddress, recipient, fee, bodyLength, nodePublicKey, funds, poown]);

  // ========== NULLIFYING THE ESCROW ===========
  const approverAddress = writeInt32(AccountType.EMPTYACCOUNTTYPE);
  bytes = Buffer.concat([bytes, approverAddress]);
  // ========== END NULLIFYING THE ESCROW =========

  const message = writeInt32(0);
  bytes = Buffer.concat([bytes, message]);

  if (seed) {
    const txHash = ZBCAddressToBytes(generateTransactionHash(bytes));
    const signature = seed.sign(txHash);
    return Buffer.concat([bytes, signature]);
  } else return bytes;
}

export function readUpdateNodeBytes(txBytes: Buffer) {
  const bodyBytesUpdateNodeLength = txBytes.slice(161, 165).readInt32LE(0);
  const bodyBytes = txBytes.slice(165, 165 + bodyBytesUpdateNodeLength);
  const pubkey = bodyBytes.slice(0, 32);
  const lockAmount = bodyBytes.slice(32, 40);
  const poown = bodyBytes.slice(40, 206);
  const txBody = {
    nodepublickey: getZBCAddress(pubkey, 'ZNK'),
    lockedbalance: readInt64(lockAmount, 0),
    poown: poown,
  };
  return txBody;
}
