// Licensed to the Quasisoft Limited - Hong Kong under one or more agreements
// The Quasisoft Limited - Hong Kong licenses this file to you under MIT license.

import { TransactionType } from '../../../grpc/model/transaction_pb';
import { readClaimNodeBytes } from './claim-node';
import { readApprovalEscrowBytes } from './escrow-transaction';
import { readRegisterNodeBytes } from './register-node';
import { readRemoveNodeBytes } from './remove-node';
import { readSendZBCBytes } from './send-money';
import { readSetupDatasetBytes } from './setup-account-dataset';
import { readUpdateNodeBytes } from './update-node';

export function readBodyBytes(txBytes: Buffer, txType: number, offset: number): any {
  switch (txType) {
    case TransactionType.UPDATENODEREGISTRATIONTRANSACTION:
      return readUpdateNodeBytes(txBytes, offset);
    case TransactionType.SENDZBCTRANSACTION:
      return readSendZBCBytes(txBytes, offset);
    case TransactionType.REMOVENODEREGISTRATIONTRANSACTION:
      return readRemoveNodeBytes(txBytes, offset);
    case TransactionType.NODEREGISTRATIONTRANSACTION:
      return readRegisterNodeBytes(txBytes, offset);
    case TransactionType.CLAIMNODEREGISTRATIONTRANSACTION:
      return readClaimNodeBytes(txBytes, offset);
    case TransactionType.SETUPACCOUNTDATASETTRANSACTION:
      return readSetupDatasetBytes(txBytes, offset);
    case TransactionType.REMOVEACCOUNTDATASETTRANSACTION:
      return readSetupDatasetBytes(txBytes, offset);
    case TransactionType.APPROVALESCROWTRANSACTION:
      return readApprovalEscrowBytes(txBytes, offset);
  }
}
