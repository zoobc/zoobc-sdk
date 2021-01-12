import jsrsasign from 'jsrsasign';
import { hwcrypto } from './helper/hwcrypto';

const hashtype = 'SHA-256';
const backend = 'auto';
const lang = 'en';

function hexToBase64(str: string = ''): string {
  return btoa(
    String.fromCharCode.apply(
      null,
      str
        .replace(/\r|\n/g, '')
        .replace(/([\da-fA-F]{2}) ?/g, '0x$1 ')
        .replace(/ +$/, '')
        .split(' ')
        .map(n => Number(n)),
    ),
  );
}

function hexToPem(s: string): string {
  var b = hexToBase64(s);
  var pem = ((b || '').match(/.{1,64}/g) || []).join('\n');
  return '-----BEGIN CERTIFICATE-----\n' + pem + '\n-----END CERTIFICATE-----';
}

export class EstoniaEid {
  private hwcrypto: any;

  constructor() {
    this.hwcrypto = hwcrypto;
  }

  async extractInfo(cert: any) {
    const pem = hexToPem(cert.hex);

    const certificate: any = new jsrsasign.X509(); // needs to assign this to "any" as the types is not compatible
    certificate.readCertPEM(pem);

    const [lastName, firstName, personalCode] = certificate.getParam().subject.array[1][0].value.split(',');
    const publicKeyRaw: any = certificate.getPublicKey(); // needs to assign this to "any" as the types is not compatible
    const publicKey = publicKeyRaw.pubKeyHex;
    const accountAddress = Buffer.from(publicKey, 'hex');
    const accountName = [firstName, lastName].join(' ');

    return {
      publicKey: accountAddress,
      accountName,
      personalCode,
      certificate,
    };
  }

  async getCardInfo() {
    if (!this.hwcrypto.use(backend)) {
      alert('Selecting backend failed.');
    }
    try {
      const response: any = await this.hwcrypto.debug();
    } catch (err) {
      alert('debug() failed: ' + err);
    }

    try {
      const response: any = await this.hwcrypto.getCertificate({ lang: lang });

      return this.extractInfo(response);
    } catch (err) {
      alert('getCertificate() failed: ' + err);
    }
  }

  async signData(data: string) {
    if (!this.hwcrypto.use(backend)) {
      alert('Selecting backend failed.');
    }
    try {
      const response: any = await this.hwcrypto.debug();
    } catch (err) {
      alert('debug() failed: ' + err);
    }
    try {
      const response: any = await this.hwcrypto.getCertificate({ lang: lang });
      var cert = response;
      const certificate = hexToPem(response.hex);
      try {
        const signatureResponse: any = await this.hwcrypto.sign(cert, { type: hashtype, hex: data }, { lang: lang });
        const signature = signatureResponse.hex.match(/.{1,64}/g).join('');
        return {
          certificateRaw: response,
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
}
