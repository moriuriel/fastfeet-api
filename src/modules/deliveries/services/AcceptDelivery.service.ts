import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import {
  IUserRepository,
  UserRepository,
} from 'src/modules/users/repositories';

import { DATABASE_ERROR } from 'src/shared/errors/exceptions';
import { DeliveryRepository, IDeliveryRepository } from '../repositories';
import { Delivery } from '../schemas/Delivery.schema';
import { DeliveryStatus, IAccepDeliveryServiceParams } from '../types';

@Injectable()
export class AcceptDeliveryService {
  constructor(
    @Inject(DeliveryRepository)
    private readonly deliveryRepository: IDeliveryRepository,

    @Inject(UserRepository)
    private readonly userRepository: IUserRepository,
  ) {}

  async execute({
    deliveryManId,
    deliveryId,
  }: IAccepDeliveryServiceParams): Promise<Delivery> {
    const currentDelivery = await this.deliveryRepository.findOne(deliveryId);

    const hasDelivery = !!currentDelivery;

    if (!hasDelivery)
      throw new HttpException('Not Found', HttpStatus.NOT_FOUND);

    const isValidStatusToAccept =
      currentDelivery.status === DeliveryStatus.OPEN;

    const hasDeliveryManForDelivery = currentDelivery.delivery_man;

    if (hasDeliveryManForDelivery)
      throw new HttpException(
        'Has deliveryMan for this delivery',
        HttpStatus.BAD_REQUEST,
      );

    if (!isValidStatusToAccept)
      throw new HttpException(
        'Invalid status to accept delivery',
        HttpStatus.BAD_REQUEST,
      );

    currentDelivery.delivery_man = {
      _id: deliveryManId,
      name: 'Uriel Mori Vanso',
    };

    currentDelivery.status = DeliveryStatus.TRANSIT;

    try {
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
