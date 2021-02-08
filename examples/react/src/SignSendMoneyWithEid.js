// Licensed to the Quasisoft Limited - Hong Kong under one or more agreements
// The Quasisoft Limited - Hong Kong licenses this file to you under MIT license.

import React, { useState } from 'react';
import { sha3_256 } from 'js-sha3';

import { sendMoneyBuilder, EstoniaEid } from '../../../';

const bytesToHexes = byteArr => {
  const a = [];
  byteArr.forEach(item => {
    const data = item.toString(16);
    data.length === 1 ? a.push(`0${data}`) : a.push(data);
  });
  return a.join('');
};

function hexToBytes(hex) {
  for (var bytes = [], c = 0; c < hex.length; c += 2)
  bytes.push(parseInt(hex.substr(c, 2), 16));
  return bytes;
}

const SignSendMoneyWithEid = () => {
  const estoniaEidObj= new EstoniaEid()
  const [eidPublicKey, setEidPublicKey] = useState('');
  const [recipient, setRecipient] = useState('');
  const [amount, setAmount] = useState('');
  const [fee, setFee] = useState('');
  const [signature, setSignature] = useState('');
  const [txBytesAndSignature, setTxBytesAndSignature] = useState('');

  const resetDisplay = isKeepPublicKey => {
    if (!isKeepPublicKey) {
      setEidPublicKey('');
    }
    setSignature('');
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
      sender: { value: hexToBytes(eidPublicKey), type: 3 },
      recipient: { value: recipient, type: 0 },
      fee: parseInt(fee),
      amount: parseInt(amount),
    });
    return txBytes;
  };

  const getPublicKeyFromEid = async () => {
    try {
      const { publicKey } = await estoniaEidObj.getCardInfo();
      setEidPublicKey(bytesToHexes(publicKey));
    } catch (e) {
      console.error('getPublicKeyFromEid', e);
    }
  };

  const signWithEid = async () => {
    try {
      const txBytes = buildTransaction();
      const txBytesString = bytesToHexes(txBytes);

      const txHash = await sha3_256(txBytes);

      const { signature } = await estoniaEidObj.signData(txHash);
      const signatureString = signature;

      setSignature(signatureString);
      setTxBytesAndSignature(txBytesString + signatureString);
    } catch (e) {
      console.error('signWithEid', e);
    }
  };

  return (
    <div>
      <div style={{ textAlign: 'center' }}>
        <div>
          <button onClick={getPublicKeyFromEid}>Get Public Key from eID</button>
        </div>
        <div>
          <h4>eID Public Key:</h4>
          <textarea style={{ width: '800px', textAlign: 'center' }} value={eidPublicKey || '--'} />
        </div>
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
        <div>
          <button onClick={signWithEid}>Sign with eID</button>
        </div>
        <div>
          <h4>Signature:</h4>
          <textarea style={{ width: '800px', textAlign: 'center' }} value={signature || '--'} />
        </div>
        <div>
          <h4>TxBytes + signature:</h4>
          <textarea rows={10} style={{ width: '800px', textAlign: 'center' }} value={txBytesAndSignature || '--'} />
        </div>
      </div>
    </div>
  );
};

export default SignSendMoneyWithEid;
