import React from 'react';
import { sha3_256 } from 'js-sha3';

import { ZooKeyring, Ledger } from '../../../../';

const bytesToHexes = byteArr => {
  const a = [];
  byteArr.forEach(item => {
    const data = item.toString(16);
    data.length === 1 ? a.push(`0${data}`) : a.push(data);
  });
  return a.join('');
};

const SignatureGenerator = ({ accountIndex, walletSignature, signature, buildTransaction, setWalletSignature, setSignature }) => {
  // ======================================================================================================================================
  // Ledger communication
  // ======================================================================================================================================
  const signTransaction = async txBytes => {
    const accountIdxInt = parseInt(accountIndex);
    if (!txBytes || txBytes.length === 0 || accountIdxInt == NaN) return;

    // signing with keyring
    const txHash = Buffer.from(sha3_256(txBytes), 'hex');
    const seed =
      'very tooth oxygen lucky fat wolf demise arrest video squeeze hybrid sock siege galaxy remain radar panda loyal culture virus goose dolphin learn throw';
    const zooKeyring = new ZooKeyring(seed, '');
    const childSeed = zooKeyring.calcDerivationPath(accountIdxInt);
    const walletSignature = childSeed.sign(txHash);
    setWalletSignature(bytesToHexes(walletSignature));

    // signing with Ledger
    setSignature('--Accept the signing in the ledger first--');
    const transport = await Ledger.getUSBTransport();
    const ledgerCommunication = new Ledger(transport);

    try {
      const response = await ledgerCommunication.signTransactionBytes(accountIdxInt, txBytes);
      setSignature(bytesToHexes(response));
    } catch (e) {
      alert(e);
    }
  };
  // ======================================================================================================================================

  return (
    <>
      <div>
        <br />
        <button onClick={() => signTransaction(buildTransaction())}>Sign Transaction</button>
      </div>
      <div>
        <h4>Wallet/SDK Signature:</h4>
        <p>{walletSignature || '--'}</p>
      </div>
      <div>
        <h4>Ledger Signature:</h4>
        <p>{signature || '--'}</p>
      </div>
    </>
  );
};

export default SignatureGenerator;
