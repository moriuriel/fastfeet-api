import { Inject, Injectable } from '@nestjs/common';
import {
  BcryptProvider,
  CryptoProvider,
} from 'src/shared/providers/hashProvider/implementations';

import { User } from '../schemas/User.schema';
import { IUserRepository, UserRepository } from '../repositories';
import { ICreateUser } from '../types';
import { DATABASE_ERROR } from 'src/shared/errors/exceptions';

@Injectable()
export class CreateUserService {
  constructor(
    @Inject(CryptoProvider)
    private readonly cryptoProvider: CryptoProvider,
    @Inject(BcryptProvider)
    private readonly bcryptProvider: BcryptProvider,
    @Inject(UserRepository)
    private readonly userRepository: IUserRepository,
  ) {}

  async execute({
    document,
    email,
    name,
    password,
    type,
  }: ICreateUser): Promise<User> {
    const encryptedEmail = this.cryptoProvider.encrypt(email);

    const encryptedDocument = this.cryptoProvider.encrypt(document);

    const hashedPassword = await this.bcryptProvider.generateHash(password);

    try {
      const user = await this.userRepository.create({
        email: encryptedEmail,
        name,
        password: hashedPassword,
        type,
        document: encryptedDocument,
      });

      return user;
    } catch (error) {
      throw new DATABASE_ERROR(error);
    }
  }
}
