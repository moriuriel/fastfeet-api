import { HttpStatus, Inject, Injectable } from '@nestjs/common';
import {
  IUserRepository,
  UserRepository,
} from 'src/modules/users/repositories';
import { UserType } from 'src/modules/users/types';

import {
  APPLICATION_ERROR,
  DATABASE_ERROR,
} from 'src/shared/errors/exceptions';
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

    const deliveryMan = await this.userRepository.findById(deliveryManId);

    const isValidDeliveryMan =
      !!deliveryMan && deliveryMan.type === UserType.DELIVERYMAN;

    if (isValidDeliveryMan)
      throw new APPLICATION_ERROR(
        'This users is not valid for accept delivery',
        HttpStatus.NOT_FOUND,
      );

    if (!hasDelivery)
      throw new APPLICATION_ERROR('Delivery not found', HttpStatus.NOT_FOUND);

    const isValidStatusToAccept =
      currentDelivery.status === DeliveryStatus.OPEN;

    const hasDeliveryManForDelivery = !!currentDelivery.delivery_man;

    if (hasDeliveryManForDelivery)
      throw new APPLICATION_ERROR(
        'Has deliveryMan for this delivery',
        HttpStatus.UNPROCESSABLE_ENTITY,
      );

    if (!isValidStatusToAccept)
      throw new APPLICATION_ERROR(
        'Invalid status to accept delivery',
        HttpStatus.UNPROCESSABLE_ENTITY,
      );

    currentDelivery.delivery_man = {
      _id: deliveryManId,
      name: deliveryMan.name,
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
