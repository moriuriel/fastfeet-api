import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from '../users/users.module';
import { DeliveriesController, AcceptDeliveryController } from './controllers';
import { DeliveryRepository } from './repositories';
import { Delivery, DeliverySchema } from './schemas/Delivery.schema';
import { AcceptDeliveryService, CreateDeliveryService } from './services';

@Module({
  imports: [
    UsersModule,
    MongooseModule.forFeature([
      { name: Delivery.name, schema: DeliverySchema },
    ]),
  ],
  controllers: [DeliveriesController, AcceptDeliveryController],
  providers: [DeliveryRepository, CreateDeliveryService, AcceptDeliveryService],
})
export class DeliveriesModule {}
