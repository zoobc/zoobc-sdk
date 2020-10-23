import { GetAccountLedgersResponse } from '../../../grpc/model/accountLedger_pb';
import { Account } from '../interfaces';
import { parseAccountAddress } from '../utils';

export interface AccountLedger {
  accountAddress: Account;
  balanceChange: number;
  blockHeight: number;
  transactionId: string;
  timestamp: number;
  eventType: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13 | 14 | 15 | 16;
}

export interface AccountLedgerList {
  total: number;
  accountLedgerList: AccountLedger[];
}

export function toZBCAccountLedger(accountLedger: GetAccountLedgersResponse.AsObject): AccountLedgerList {
  const list = accountLedger.accountledgersList.map(ledger => {
    return {
      accountAddress: parseAccountAddress(ledger.accountaddress),
      balanceChange: ledger.balancechange,
      blockHeight: ledger.blockheight,
      transactionId: ledger.transactionid,
      timestamp: ledger.timestamp,
      eventType: ledger.eventtype,
    };
  });
  return {
    total: parseInt(accountLedger.total),
    accountLedgerList: list,
  };
}
