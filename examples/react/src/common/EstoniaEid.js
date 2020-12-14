import jsrsasign from 'jsrsasign';
import base32Encode from 'base32-encode';


function hexToBase64(str) {
  return btoa(
    String.fromCharCode.apply(
      null,
      str
        .replace(/\r|\n/g, '')
        .replace(/([\da-fA-F]{2}) ?/g, '0x$1 ')
        .replace(/ +$/, '')
        .split(' ')
    )
  );
}

function hexToPem(s) {
  var b = hexToBase64(s);
  var pem = b.match(/.{1,64}/g).join('\n');
  return '-----BEGIN CERTIFICATE-----\n' + pem + '\n-----END CERTIFICATE-----';
}

const hashtype = 'SHA-256';
const backend = 'auto';
const lang = 'en';
let certificateCache;

export function extractInfo(cert) {
  const pem = hexToPem(cert.hex);
  console.log('pem:\n', pem);

  const certificate = new jsrsasign.X509();
  certificate.readCertPEM(pem);

  const [lastName, firstName, personalCode] = certificate.getParam().subject.array[1][0].value.split(',');
  const publicKey = certificate.getPublicKey().pubKeyHex;
  const accountAddress = Buffer.from(publicKey, 'hex')
  const accountName = [firstName, lastName].join(' ');
  console.log('debug public key:', Buffer.from(publicKey, 'hex'));

  return {
    publicKey: accountAddress,
    accountName,
    personalCode,
    certificate,
  };
}

export async function getCardInfo() {
  if (!window.hwcrypto.use(backend)) {
    alert('Selecting backend failed.');
  }
  try {
    const response = await window.hwcrypto.debug();
    console.log('Debug: ' + response);
  } catch (err) {
    alert('debug() failed: ' + err);
  }

  try {
    const response = await window.hwcrypto.getCertificate({ lang: lang });


    return extractInfo(response);
  } catch (err) {
    alert('getCertificate() failed: ' + err);
  }
}

export async function signData(data) {
  if (!window.hwcrypto.use(backend)) {
    alert('Selecting backend failed.');
  }
  try {
    const response = await window.hwcrypto.debug();
    console.log('Debug: ' + response);
  } catch (err) {
    alert('debug() failed: ' + err);
  }
  try {

    if (!certificateCache){
      certificateCache = await window.hwcrypto.getCertificate({ lang: lang });
    }
    const certificate = hexToPem(certificateCache.hex);
    console.log(hexToPem(certificateCache.hex));
    console.log('data:', data);
    try {
      const signatureResponse = await window.hwcrypto.sign(
        certificateCache,
        { type: hashtype, hex: data },
        { lang: lang }
      );
      const signature = signatureResponse.hex.match(/.{1,64}/g).join('');
      return {
        certificateRaw: certificateCache,
        certificate,
        signature,
      };
    } catch (err) {
      alert('sign() failed: ' + err);
    }
  } catch (err) {
    alert('getCertificate() failed: ' + err);
  }
}
