import React, { useState } from 'react';

const CertificateComponent = () => {
  const [certificate, setCertificate] = useState(undefined);
  return (
    <div>
      <button
        onClick={() => {
          setCertificate('Loading...')
          // to perform these actions, we need to import the hwcrypto.js in public/index.html
          window.hwcrypto.use('auto').then(result => {
            if (!result) {
              console.log('Selecting backend failed.');
            }
            window.hwcrypto
              .getCertificate({ lang: 'en' })
              .then(response => {
                setCertificate(response.hex);
              })
              .catch(err => console.log('debug err', err));
          });
        }}
      >
        Get Certificate
      </button>
      <div>Certificate:</div>
      <div style={{ width: '100%', overflowWrap: 'break-word' }}>{String((certificate && certificate.hex) || certificate)}</div>
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
