import { Module } from '@nestjs/common';
import { UsersModule } from '../users/users.module';
import { DeliveriesController } from './controllers/Deliveries.controller';

@Module({
  imports: [UsersModule],
  controllers: [DeliveriesController],
})
export class DeliveriesModule {}
