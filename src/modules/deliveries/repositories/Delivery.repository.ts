import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Delivery } from '../schemas/Delivery.schema';
import { ICreateDelivery } from '../types';
import {
  IDeliveryRepository,
  IUpdateDeliveryParams,
} from './DeliveryRepository.interface';

@Injectable()
export class DeliveryRepository implements IDeliveryRepository {
  constructor(
    @InjectModel(Delivery.name) private deliveryRepository: Model<Delivery>,
  ) {}

  async create(delivery: ICreateDelivery): Promise<Delivery> {
    return this.deliveryRepository.create(delivery);
  }

  async findOne(id: string): Promise<Delivery> {
    return this.deliveryRepository.findById(id);
  }

  async update({ delivery, id }: IUpdateDeliveryParams) {
    return this.deliveryRepository.findByIdAndUpdate(
      { _id: new Types.ObjectId(id) },
      delivery,
      {
        new: true,
      },
    );
  }
}
