import { Module } from '@nestjs/common';
import { BcryptProvider } from './implementations/Bcrypt.provider';

@Module({ providers: [BcryptProvider], exports: [BcryptProvider] })
export class HashProvider {}
