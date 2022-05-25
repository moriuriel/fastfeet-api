import { Module } from '@nestjs/common';
import { HashProvider } from 'src/shared/providers/hashProvider/HashProvider.module';
import { UsersController } from './controllers/User.controller';

@Module({
  controllers: [UsersController],
  imports: [HashProvider],
})
export class UsersModule {}
