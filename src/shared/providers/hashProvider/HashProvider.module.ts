import { Module } from '@nestjs/common';
import { BcryptProvider, CryptoProvider } from './implementations';

@Module({
  providers: [BcryptProvider, CryptoProvider],
  exports: [BcryptProvider, CryptoProvider],
})
export class HashProvider {}
