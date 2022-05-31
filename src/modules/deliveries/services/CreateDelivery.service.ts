import { Inject, Injectable } from '@nestjs/common';

import { DATABASE_ERROR } from 'src/shared/errors/exceptions';
import { DeliveryRepository, IDeliveryRepository } from '../repositories';
import { Delivery } from '../schemas/Delivery.schema';
import { ICreateDelivery } from '../types';

@Injectable()
export class CreateDeliveryService {
  constructor(
    @Inject(DeliveryRepository)
    private readonly deliveryRepository: IDeliveryRepository,
  ) {}

  async execute({
    owner,
    products,
    shipping_address,
  }: ICreateDelivery): Promise<Delivery> {
    try {
      const user = await this.deliveryRepository.create({
        owner,
        products,
        shipping_address,
      });

      return user;
    } catch (error) {
      throw new DATABASE_ERROR(error);
    }
  }
}
