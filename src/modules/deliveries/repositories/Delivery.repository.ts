import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Delivery } from '../schemas/Delivery.schema';
import { ICreateDelivery } from '../types';
import { IDeliveryRepository } from './DeliveryRepository.interface';

@Injectable()
export class DeliveryRepository implements IDeliveryRepository {
  constructor(
    @InjectModel(Delivery.name) private deliveryRepository: Model<Delivery>,
  ) {}

  async create(delivery: ICreateDelivery): Promise<Delivery> {
    return this.deliveryRepository.create(delivery);
  }
}
