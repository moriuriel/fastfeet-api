import { Injectable, Inject, HttpException, HttpStatus } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import {
  IUserRepository,
  UserRepository,
} from 'src/modules/users/repositories';
import configuration from 'src/shared/config/configuration';
import {
  CryptoProvider,
  BcryptProvider,
} from 'src/shared/providers/hashProvider/implementations';
import {
  ICryptoProvider,
  IHashProvider,
} from 'src/shared/providers/hashProvider/types';

import { IAuthenticationReponse, IAuthenticationUser } from '../interfaces';

@Injectable()
export class AuthenticationService {
  constructor(
    private readonly jwtService: JwtService,

    @Inject(UserRepository)
    private readonly userRepository: IUserRepository,

    @Inject(CryptoProvider)
    private readonly cryptoProvider: ICryptoProvider,

    @Inject(BcryptProvider)
    private readonly bcryptProvider: IHashProvider,
  ) {}

  public async execute(
    data: IAuthenticationUser,
  ): Promise<IAuthenticationReponse> {
    const { email, password } = data;

    const encryptedEmail = this.cryptoProvider.encrypt(email);

    const checkUserExist = await this.userRepository.findByEmail(
      encryptedEmail,
    );

    if (!checkUserExist) {
      throw new HttpException(
        {
          status: HttpStatus.NOT_FOUND,
          error: 'User not found.',
        },
        HttpStatus.NOT_FOUND,
      );
    }

    const validatePassword = await this.bcryptProvider.compareHash({
      value: password,
      hashed: checkUserExist.password,
    });

    if (!validatePassword) {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          error: 'User/Password is worng.',
        },
        HttpStatus.BAD_REQUEST,
      );
    }

    const payload = { sub: checkUserExist._id };

    return {
      access_token: this.jwtService.sign(payload, {
        secret: configuration().jwt.secret,
        expiresIn: configuration().jwt.expiresIn,
      }),
    };
  }
}
