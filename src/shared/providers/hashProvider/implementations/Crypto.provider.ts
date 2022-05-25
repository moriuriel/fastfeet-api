import * as crypto from 'crypto';
import configuration from 'src/shared/config/configuration';
import { ICryptoProvider } from '../types';

export class CryptoProvider implements ICryptoProvider {
  encrypt(password: string): string {
    const iv = this.hexStringToByte(configuration().encryption.iv.toString());

    const cipher = crypto.createCipheriv(
      'aes-256-cbc',
      configuration().encryption.key,
      iv,
    );
    let encrypted = cipher.update(password, 'utf8');
    encrypted = Buffer.concat([encrypted, cipher.final()]);
    return `${iv.toString('hex')}:${encrypted.toString('hex')}`;
  }

  decrypt(text): string {
    const textParts = text.split(':');
    const iv = Buffer.from(textParts.shift(), 'hex');
    const encryptedText = Buffer.from(textParts.join(':'), 'hex');
    const decipher = crypto.createDecipheriv(
      'aes-256-cbc',
      Buffer.from(configuration().encryption.key),
      iv,
    );
    let decrypted = decipher.update(encryptedText);
    decrypted = Buffer.concat([decrypted, decipher.final()]);

    return decrypted.toString();
  }

  hexStringToByte(str: string): Buffer {
    return Buffer.from(str, 'utf8');
  }
}
