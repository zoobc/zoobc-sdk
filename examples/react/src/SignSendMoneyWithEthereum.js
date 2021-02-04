import React, { useState } from 'react';
import { sendMoneyBuilder } from '../../../';
import Wallet, { hdkey } from 'ethereumjs-wallet';
import { keccak256, ecsign, toRpcSig, toBuffer } from 'ethereumjs-util';

const bytesToHexes = byteArr => {
  const a = [];
  byteArr.forEach(item => {
    const data = item.toString(16);
    data.length === 1 ? a.push(`0${data}`) : a.push(data);
  });
  return a.join('');
};

const SignSendMoneyWithEthereum = () => {
  const [privateKey, setPrivateKey] = useState(null);
  const [recipient, setRecipient] = useState('');
  const [amount, setAmount] = useState('');
  const [fee, setFee] = useState('');
  const [signature, setSignature] = useState('');
  const [txBytesAndSignature, setTxBytesAndSignature] = useState('');

  const publicKey = privateKey ? Wallet.fromPrivateKey(privateKey).getPublicKey() : null;
  const address = publicKey ? Wallet.fromPublicKey(publicKey).getAddress(): null

  const resetDisplay = isKeepPublicKey => {
    if (!isKeepPublicKey) {
      setPrivateKey(null);
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
      sender: { value: publicKey, type: 4 },
      recipient: { value: recipient, type: 0 },
      fee: parseInt(fee),
      amount: parseInt(amount),
    });
    return txBytes;
  };

  const generatePrivateKey = async () => {
    try {
      const privateKey = hdkey.fromMasterSeed('random')._hdkey._privateKey;
      setPrivateKey(privateKey);
    } catch (e) {
      console.error('generatePrivateKey', e);
    }
  };

  const signWithEthereum = async () => {
    try {
      const txBytes = buildTransaction();
      const txBytesString = bytesToHexes(txBytes);
      const txHash = await keccak256(txBytes);

      const signatureRaw = await ecsign(txHash, privateKey);
      const signature = toBuffer(toRpcSig(signatureRaw.v, signatureRaw.r, signatureRaw.s));
      console.log('signature', signature);
      const signatureString = bytesToHexes(signature);

      setSignature(signatureString);
      setTxBytesAndSignature(txBytesString + signatureString);
    } catch (e) {
      console.error('signWithEthereum', e);
    }
  };

  return (
    <div>
      <div style={{ textAlign: 'center' }}>
        <div>
          <button onClick={generatePrivateKey}>Generate private key</button>
        </div>
        {privateKey && (
          <div>
            <h4>Private Key:</h4>
            <textarea style={{ width: '800px', textAlign: 'center' }} value={bytesToHexes(privateKey) || '--'} />
          </div>
        )}
        {publicKey && (
          <div>
            <h4>Public Key:</h4>
            <textarea style={{ width: '800px', textAlign: 'center' }} value={bytesToHexes(publicKey) || '--'} />
          </div>
        )}
        {address && (
          <div>
            <h4>Ethereum Address:</h4>
            <textarea style={{ width: '800px', textAlign: 'center' }} value={bytesToHexes(address) || '--'} />
          </div>
        )}
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
          <button onClick={signWithEthereum}>Sign with ethereum</button>
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

export default SignSendMoneyWithEthereum;
