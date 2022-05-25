import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from './modules/users/users.module';
import configuration from './shared/config/configuration';
import { DatabaseModule } from './shared/database/database.module';
import { HashProvider } from './shared/providers/hashProvider/HashProvider.module';

@Module({
  imports: [
    ConfigModule.forRoot({ load: [configuration] }),
    DatabaseModule,
    HashProvider,
    UsersModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
