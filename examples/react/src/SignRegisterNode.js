import React, { useState } from 'react';

import { registerNodeBuilder } from '../../../';
import PublicKeyGenerator from './common/PublicKeyGenerator';
import SignatureGenerator from './common/SignatureGenerator';

function toByteArray(hexString) {
  var result = [];
  for (var i = 0; i < hexString.length; i += 2) {
    result.push(parseInt(hexString.substr(i, 2), 16));
  }
  return result;
}

const SignRegisterNode = () => {
  const [accountIndex, setAccountIndex] = useState('');
  const [walletPublicKey, setWalletPublicKey] = useState('');
  const [publicKey, setPublicKey] = useState('');
  const [fee, setFee] = useState('');
  const [signature, setSignature] = useState('');
  const [walletSignature, setWalletSignature] = useState('');
  const [nodePublicKey, setNodePublicKey] = useState('');
  const [lockedBalance, setLockedBalance] = useState('');

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

  const handleChangeNodePublicKey = ({ target: { value } = {} } = {}) => {
    setNodePublicKey(value);
    resetDisplay(true);
  };

  const handleChangeLockedBalance = ({ target: { value } = {} } = {}) => {
    setLockedBalance(value);
    resetDisplay(true);
  };

  const handleChangeFee = ({ target: { value } = {} } = {}) => {
    setFee(value);
    resetDisplay(true);
  };

  const buildTransaction = () => {
    const data = {
      accountAddress: publicKey,
        fee: parseInt(fee),
        nodePublicKey: Buffer.from(toByteArray(nodePublicKey)),
        funds: parseInt(lockedBalance),
    }
    const tempPoow = '020000005a42435f46355955594458445f5746444a534156355f4b3359373252434d5f474c5150333258495f514456584f4747445f4a3743475353534b5f35564b5237594d4cffbed81db2f2164b00b917248817f654d5f795952fa8f1266951ff8ff170378c9d05000013ffc98996f567da13fd0a99ca88f8b287041f94f6721dcadcb31cce68ef509687f55b686f173c9e75f13a1333431bc0d20a5163817b4d7e4b9e19f3523c440b0000000000000000000000000000000000000000000000004400000000000000ee812d08ee258b3905941ce8d0ef440ff946211e3c60eb0fcbde66b07386497cf6d1221ace9942b969b5b0b951f1c9404f69a5fb0e3b0ececec996801e03c900'
    const txBytes = registerNodeBuilder(data, Buffer.from(toByteArray(tempPoow)));
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
          <h4>Node Public Key (in hex):</h4>
          <p>Example: 74ff679a4ec3c0fbb86f09ef4c026311d61de49fa902e41dd02b0c52b2823743</p>
          <input name="nodePublicKey" onChange={handleChangeNodePublicKey} value={nodePublicKey} />
        </div>
        <div>
          <h4>LockedBalance:</h4>
          <input name="lockedBalance" onChange={handleChangeLockedBalance} value={lockedBalance} />
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

export default SignRegisterNode;
