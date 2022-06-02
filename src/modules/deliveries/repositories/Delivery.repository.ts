import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { IPagination } from 'src/shared/decorators/GetPagination';
import { Delivery } from '../schemas/Delivery.schema';
import { ICreateDelivery } from '../types';
import {
  IDeliveryRepository,
  IFindAllDeliveryResponse,
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

  async findAll({
    limit,
    page,
  }: IPagination): Promise<IFindAllDeliveryResponse> {
    const total = await this.deliveryRepository.count();

    const deliveries = await this.deliveryRepository
      .find()
      .limit(limit)
      .skip((page - 1) * limit);

    return { total, deliveries };
  }

  async findAllByOwnerId(
    { limit, page }: IPagination,
    customerId: string,
  ): Promise<IFindAllDeliveryResponse> {
    const total = await this.deliveryRepository.count();

    const deliveries = await this.deliveryRepository
      .find({ 'owner._id': new Types.ObjectId(customerId) })
      .limit(limit)
      .skip((page - 1) * limit);

    return { total, deliveries };
  }
}
