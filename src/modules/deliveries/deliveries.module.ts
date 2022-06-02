import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from '../users/users.module';
import {
  DeliveriesController,
  AcceptDeliveryController,
  FindAllDeliveriesByCustomerController,
} from './controllers';
import { DeliveryRepository } from './repositories';
import { Delivery, DeliverySchema } from './schemas/Delivery.schema';
import {
  AcceptDeliveryService,
  CreateDeliveryService,
  FindAllDeliveriesByCustomerService,
  FindAllDeliveriesService,
} from './services';

@Module({
  imports: [
    UsersModule,
    MongooseModule.forFeature([
      { name: Delivery.name, schema: DeliverySchema },
    ]),
  ],
  controllers: [
    DeliveriesController,
    AcceptDeliveryController,
    FindAllDeliveriesByCustomerController,
  ],
  providers: [
    DeliveryRepository,
    CreateDeliveryService,
    AcceptDeliveryService,
    FindAllDeliveriesService,
    FindAllDeliveriesByCustomerService,
  ],
})
export class DeliveriesModule {}
