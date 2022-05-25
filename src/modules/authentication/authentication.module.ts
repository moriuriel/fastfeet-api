import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import configuration from 'src/shared/config/configuration';
import { HashProvider } from 'src/shared/providers/hashProvider/HashProvider.module';

import { UsersModule } from '../users/users.module';
import AuthenticationController from './controllers/Authentication.controller';
import { AuthenticationService } from './services';
import { JwtStrategy } from './strategies/jwt.strategy';

@Module({
  imports: [
    UsersModule,
    HashProvider,
    PassportModule,
    JwtModule.register({
      secret: configuration().jwt.secret,
      signOptions: { expiresIn: configuration().jwt.expiresIn },
    }),
  ],
  providers: [AuthenticationService, JwtStrategy],
  controllers: [AuthenticationController],
})
export class AuthenticationModule {}
