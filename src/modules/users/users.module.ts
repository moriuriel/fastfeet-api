import { Module } from '@nestjs/common';
import { UsersController } from './controllers/User.controller';

@Module({
  controllers: [UsersController],
})
export class UsersModule {}
