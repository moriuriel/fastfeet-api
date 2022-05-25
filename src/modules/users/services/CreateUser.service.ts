import { Inject, Injectable } from '@nestjs/common';
import { BcryptProvider } from 'src/shared/providers/hashProvider/implementations/Bcrypt.provider';
import { CryptoProvider } from 'src/shared/providers/hashProvider/implementations/Crypto.provider';
import { IUserRepository } from '../repositories/IUserRepository.interface';
import { UserRepository } from '../repositories/User.repository';
import { User } from '../schemas/User.schema';

import { ICreateUser } from '../types';

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
      console.log(error);
    }
  }
}
