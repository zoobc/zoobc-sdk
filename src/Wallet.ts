// Licensed to the Quasisoft Limited - Hong Kong under one or more agreements
// The Quasisoft Limited - Hong Kong licenses this file to you under MIT license.

import * as CryptoJS from 'crypto-js';
import { encryptPassword } from './helper/utils';

function encryptPassphrase(passphrase: string, password: string, salt: string = 'salt'): string {
  const key = encryptPassword(password, salt);
  return CryptoJS.AES.encrypt(passphrase, key).toString();
}

function decryptPassphrase(encPassphrase: string, password: string, salt: string = 'salt'): string {
  const key = encryptPassword(password, salt);
  try {
    const seed = CryptoJS.AES.decrypt(encPassphrase, key).toString(CryptoJS.enc.Utf8);
    if (!seed) throw 'not match';
    return seed;
  } catch (e) {
    return '';
  }
}

export default { encryptPassphrase, decryptPassphrase };
