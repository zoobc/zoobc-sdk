// Licensed to the Quasisoft Limited - Hong Kong under one or more agreements
// The Quasisoft Limited - Hong Kong licenses this file to you under MIT license.

import React, { useState } from 'react';

import { sendMoneyBuilder } from '../../../';
import PublicKeyGenerator from './common/PublicKeyGenerator';
import SignatureGenerator from './common/SignatureGenerator';

const SignSendMoney = () => {
  const [accountIndex, setAccountIndex] = useState('');
  const [walletPublicKey, setWalletPublicKey] = useState('');
  const [publicKey, setPublicKey] = useState('');
  const [recipient, setRecipient] = useState('');
  const [amount, setAmount] = useState('');
  const [fee, setFee] = useState('');
  const [signature, setSignature] = useState('');
  const [walletSignature, setWalletSignature] = useState('');
  const [txBytes, setTxBytes] = useState('');

  const resetDisplay = isKeepPublicKey => {
    if (!isKeepPublicKey) {
      setWalletPublicKey('');
      setPublicKey('');
    }
    setSignature('');
    setWalletSignature('');
  };

  const handleChangeAccountIndex = (value) => {
    setAccountIndex(value);
    resetDisplay();
  };

  const handleChangeRecipient = ({ target: { value } = {} } = {}) => {
    setRecipient(value);
    resetDisplay(true);
  };

  const handleChangeAmount = ({ target: { value } = {} } = {}) => {
    setAmount(value);
    resetDisplay(true);
  };

  const handleChangeFee = ({ target: { value } = {} } = {}) => {
    setFee(value);
    resetDisplay(true);
  };

  const buildTransaction = () => {
    const txBytes = sendMoneyBuilder({
      sender: { value: publicKey, type: 0 },
      recipient:{ value: recipient, type: 0 },
      fee: parseInt(fee),
      amount: parseInt(amount),
    });
    return txBytes;
  };

  return (
    <div>
      <div style={{ textAlign: 'center' }}>
        <PublicKeyGenerator
          accountIndex={accountIndex}
          walletPublicKey={walletPublicKey}
          publicKey={publicKey}
          setWalletPublicKey={setWalletPublicKey}
          setPublicKey={setPublicKey}
          handleChangeAccountIndex={handleChangeAccountIndex}
        />
        <div>
          <h4>Recipient:</h4>
          <input name="recipient" onChange={handleChangeRecipient} value={recipient} />
        </div>
        <div>
          <h4>Amount:</h4>
          <input name="amount" onChange={handleChangeAmount} value={amount} />
        </div>
        <div>
          <h4>Fee:</h4>
          <input name="fee" onChange={handleChangeFee} value={fee} />
        </div>
        <SignatureGenerator
          accountIndex={accountIndex}
          walletSignature={walletSignature}
          signature={signature}
          buildTransaction={buildTransaction}
          setWalletSignature={setWalletSignature}
          setSignature={setSignature}
        />
      </div>
    </div>
  );
};

export default SignSendMoney;
