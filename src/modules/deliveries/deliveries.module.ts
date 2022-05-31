import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from '../users/users.module';
import { DeliveriesController } from './controllers/Deliveries.controller';
import { DeliveryRepository } from './repositories';
import { Delivery, DeliverySchema } from './schemas/Delivery.schema';
import { CreateDeliveryService } from './services';

@Module({
  imports: [
    UsersModule,
    MongooseModule.forFeature([
      { name: Delivery.name, schema: DeliverySchema },
    ]),
  ],
  controllers: [DeliveriesController],
  providers: [DeliveryRepository, CreateDeliveryService],
})
export class DeliveriesModule {}
