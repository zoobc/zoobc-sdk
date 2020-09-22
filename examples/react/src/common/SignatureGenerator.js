import React from 'react';

import { ZooKeyring, Ledger, writeInt32 } from '../../../../';

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
    const seed =
      'very tooth oxygen lucky fat wolf demise arrest video squeeze hybrid sock siege galaxy remain radar panda loyal culture virus goose dolphin learn throw';
    const zooKeyring = new ZooKeyring(seed, '');
    const childSeed = zooKeyring.calcDerivationPath(accountIdxInt);
    const walletSignature = childSeed.sign(txBytes);
    setWalletSignature(bytesToHexes(walletSignature));

    // signing with Ledger
    setSignature('--Accept the signing in the ledger first--');
    // const transport = await Ledger.getUSBTransport();
    // const ledgerCommunication = new Ledger(transport);
    // const response = await ledgerCommunication.signTransactionBytes(accountIdxInt, txBytes);
    // setSignature(bytesToHexes(response));

    try {
      const response = await signTransactionBytes(accountIdxInt, txBytes);
      setSignature(bytesToHexes(response));
    } catch (e) {
      alert(e);
    }
  };
  // ======================================================================================================================================
  const signTransactionBytes = async (accountIndex, txBytes) => {
    const transport = await Ledger.getUSBTransport();
    const CLA = 0x80;
    const INS_SIGN_TRANSACTION = 0x03;
    // if (!this.transport) {
    //   throw Error('transport is not set');
    // }
    // if (!txBytes || txBytes.length === 0) {
    //   throw Error('txBytes value is invalid');
    // }
    const LEDGER_MAX_INPUT_DATA_BYTES = 150;
    let P1_FIRST = 0x00;
    let P1_MORE = 0x80;
    let P2_LAST = 0x00;
    let P2_MORE = 0x80;

    const accountIdxBuffer = writeInt32(accountIndex);
    const data = Buffer.concat([accountIdxBuffer, txBytes]);

    let offset = 0;
    let response = Buffer.from('');
    while (offset < data.length) {
      let chunk = Buffer.from('');
      let p1 = P1_FIRST;
      let p2 = P2_LAST;

      if (data.length - offset < LEDGER_MAX_INPUT_DATA_BYTES) {
        chunk = data.slice(offset, data.length);
      } else {
        chunk = data.slice(offset, offset + LEDGER_MAX_INPUT_DATA_BYTES);
      }

      if (offset === 0) {
        p1 = P1_FIRST;
      } else {
        p1 = P1_MORE;
      }

      const isLastData = offset + chunk.length === data.length;
      if (isLastData) {
        p2 = P2_LAST;
      } else {
        p2 = P2_MORE;
      }

      const chunkLength = writeInt32(chunk.length);

      try {
        response = await transport.exchange(
          Buffer.concat([new Buffer([CLA, INS_SIGN_TRANSACTION, p1, p2]), Buffer.concat([chunkLength, chunk])]),
        );
      } catch (e) {
        throw e;
      }
      offset += chunk.length
    }

    return response.slice(0, response.length - 2);
  };

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
