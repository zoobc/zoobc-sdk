import { parse } from 'path';
import { Escrow as EscrowResponse, GetEscrowTransactionsResponse } from '../../../grpc/model/escrow_pb';
import { Account } from '../interfaces';
import { parseAccountAddress } from '../utils';

export interface Escrow {
  id: string;
  sender: Account;
  recipient: Account;
  approver: Account;
  amount: number;
  commission: number;
  timeout: number;
  status: 0 | 1 | 2 | 3;
  blockHeight: number;
  latest: boolean;
  instruction: string;
}

export interface Escrows {
  total: number;
  escrowList: Escrow[];
}

export function toZBCEscrow(escrow: EscrowResponse.AsObject): Escrow {
  return {
    id: escrow.id,
    sender: parseAccountAddress(escrow.senderaddress),
    recipient: parseAccountAddress(escrow.recipientaddress),
    approver: parseAccountAddress(escrow.approveraddress),
    amount: parseInt(escrow.amount),
    commission: parseInt(escrow.commission),
    timeout: parseInt(escrow.timeout),
    status: escrow.status,
    blockHeight: escrow.blockheight,
    latest: escrow.latest,
    instruction: escrow.instruction,
  };
}

export function toZBCEscrows(escrows: GetEscrowTransactionsResponse.AsObject): Escrows {
  const list = escrows.escrowsList.map(escrow => toZBCEscrow(escrow));
  return {
    total: parseInt(escrows.total),
    escrowList: list,
  };
}
