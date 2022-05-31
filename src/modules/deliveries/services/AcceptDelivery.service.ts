import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';

import { DATABASE_ERROR } from 'src/shared/errors/exceptions';
import { DeliveryRepository, IDeliveryRepository } from '../repositories';
import { Delivery } from '../schemas/Delivery.schema';
import { IAccepDeliveryServiceParams } from '../types';

@Injectable()
export class AcceptDeliveryService {
  constructor(
    @Inject(DeliveryRepository)
    private readonly deliveryRepository: IDeliveryRepository,
  ) {}

  async execute({
    deliveryManId,
    deliveryId,
  }: IAccepDeliveryServiceParams): Promise<Delivery> {
    try {
      const currentDelivery = await this.deliveryRepository.findOne(deliveryId);

      const hasDelivery = !!currentDelivery;

      if (!hasDelivery)
        throw new HttpException('Not Found', HttpStatus.NOT_FOUND);

      currentDelivery.delivery_man = {
        _id: deliveryManId,
        name: 'Uriel Mori Vanso',
      };

      const updatedDelivery = await this.deliveryRepository.update({
        delivery: currentDelivery,
        id: deliveryId,
      });

      return updatedDelivery;
    } catch (error) {
      throw new DATABASE_ERROR(error);
    }
  }
}
