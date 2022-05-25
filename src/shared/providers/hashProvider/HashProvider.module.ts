import { Module } from '@nestjs/common';
import { BcryptProvider } from './implementations/Bcrypt.provider';
import { CryptoProvider } from './implementations/Crypto.provider';

@Module({
  providers: [BcryptProvider, CryptoProvider],
  exports: [BcryptProvider, CryptoProvider],
})
export class HashProvider {}
