import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { HashProvider } from 'src/shared/providers/hashProvider/HashProvider.module';
import { UsersController } from './controllers/User.controller';
import { UserRepository } from './repositories/User.repository';
import { User, UserSchema } from './schemas/User.schema';
import { CreateUserService } from './services';

@Module({
  imports: [
    HashProvider,
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
  ],
  controllers: [UsersController],
  providers: [UserRepository, CreateUserService],
  exports: [UserRepository],
})
export class UsersModule {}
