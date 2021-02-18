// Licensed to the Quasisoft Limited - Hong Kong under one or more agreements
// The Quasisoft Limited - Hong Kong licenses this file to you under MIT license.

import React from 'react';

import { getZBCAddress, ZooKeyring, Ledger } from '../../../../';

const PublicKeyGenerator = ({ accountIndex, walletPublicKey, publicKey, setWalletPublicKey, setPublicKey, handleChangeAccountIndex }) => {
  // ======================================================================================================================================
  // Ledger communication
  // ======================================================================================================================================
  const getPublicKey = async () => {
    const accountIdxInt = parseInt(accountIndex);
    if (accountIndex === '' || accountIdxInt === isNaN) return;

    // get public key with SDK
    const seed =
      'very tooth oxygen lucky fat wolf demise arrest video squeeze hybrid sock siege galaxy remain radar panda loyal culture virus goose dolphin learn throw';
    const zooKeyring = new ZooKeyring(seed, '');
    const childSeed = zooKeyring.calcDerivationPath(accountIdxInt);
    const walletPublicKeyBytes = childSeed.publicKey;
    setWalletPublicKey(getZBCAddress(walletPublicKeyBytes));

    // get public key with Ledger
    const transport = await Ledger.getUSBTransport();
    const ledgerCommunication = new Ledger(transport);
    const response = await ledgerCommunication.getPublicKey(accountIdxInt);
    setPublicKey(getZBCAddress(response));
  };
  // ======================================================================================================================================

  const handleIndexChange = ({ target: { value } = {}, key } = {}) => {
    if (key === 'Enter') {
      getPublicKey();
      return;
    }
    handleChangeAccountIndex(value);
  };

  return (
    <>
      <div>
        <h4>Account Index:</h4>
        <input name="accountIndex" onChange={handleIndexChange} onKeyDown={handleIndexChange} value={accountIndex} />
        <br />
        <button onClick={getPublicKey}>Get Corresponding Public Key</button>
      </div>
      <div>
        <h4>Wallet/SDK Public Key:</h4>
        <p>{walletPublicKey || '--'}</p>
      </div>
      <div>
        <h4>Ledger Public Key:</h4>
        <p>{publicKey || '--'}</p>
      </div>
    </>
  );
};

export default PublicKeyGenerator;
