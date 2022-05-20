import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import configuration from '../config/configuration';

@Module({
  imports: [
    MongooseModule.forRootAsync({
      useFactory: () => ({
        uri: `mongodb://${configuration().database.user}:${
          configuration().database.user
        }@${configuration().database.host}:${configuration().database.port}`,
        dbName: configuration().database.name,
      }),
    }),
  ],
})
export class DatabaseModule {}
