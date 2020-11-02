import React, { useState } from 'react';

function hexToBase64(str) {
  return btoa(
    String.fromCharCode.apply(
      null,
      str
        .replace(/\r|\n/g, '')
        .replace(/([\da-fA-F]{2}) ?/g, '0x$1 ')
        .replace(/ +$/, '')
        .split(' '),
    ),
  );
}

function hexToPem(s) {
  var b = hexToBase64(s);
  var pem = b.match(/.{1,64}/g).join('\n');
  return '-----BEGIN CERTIFICATE-----\n' + pem + '\n-----END CERTIFICATE-----';
}

const CertificateComponent = () => {
  const [messageHash, setMessageHash] = useState('');
  const [certificate, setCertificate] = useState(undefined);
  const [signature, setSignature] = useState(undefined);

  const sign = () => {
    setCertificate('Loading...');
    setSignature('Loading...');
    console.log('sign() clicked on ' + new Date().toUTCString());
    // Select hash
    var hashtype = 'SHA-256';
    // Set backend if asked
    var backend = 'auto';
    // get language
    var lang = 'en';
    if (!window.hwcrypto.use(backend)) {
      alert('Selecting backend failed.');
    }

    window.hwcrypto.debug().then(
      function (response) {
        console.log('Debug: ' + response);
      },
      function (err) {
        alert('debug() failed: ' + err);
        return;
      },
    );

    // Sign
    window.hwcrypto.getCertificate({ lang: lang }).then(
      function (response) {
        var cert = response;
        setCertificate(hexToPem(response.hex));
        console.log(hexToPem(response.hex));
        window.hwcrypto.sign(cert, { type: hashtype, hex: messageHash }, { lang: lang }).then(
          function (response) {
            setSignature(response.hex.match(/.{1,64}/g).join(''));
          },
          function (err) {
            alert('sign() failed: ' + err);
          },
        );
      },
      function (err) {
        alert('getCertificate() failed: ' + err);
      },
    );
  };

  return (
    <div>
      <label>Message Hash 256:</label>
      <input
        onChange={({ target: { value } = {} }) => {
          setMessageHash(value);
        }}
        value={messageHash}
      />
      <button onClick={sign}>Sign</button>
      <div>Certificate:</div>
      <div style={{ width: '100%', overflowWrap: 'break-word' }}>{certificate}</div>
      <div style={{ marginTop: '20px' }}>Signature:</div>
      <div style={{ width: '100%', overflowWrap: 'anywhere' }}>{signature}</div>
    </div>
  );
};

const EstEid = () => {
  return (
    <div>
      <CertificateComponent />
      <br />
    </div>
  );
};

export default EstEid;
