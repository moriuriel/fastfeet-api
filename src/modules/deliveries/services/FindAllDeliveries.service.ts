import { Inject, Injectable } from '@nestjs/common';
import { IPagination } from 'src/shared/decorators/GetPagination/GetPagination.interface';
import { DATABASE_ERROR } from 'src/shared/errors/exceptions';
import { DeliveryRepository, IDeliveryRepository } from '../repositories';
import { FindAllDeliveriesResponse } from '../types';

@Injectable()
export class FindAllDeliveriesService {
  constructor(
    @Inject(DeliveryRepository)
    private readonly deliveryRepository: IDeliveryRepository,
  ) {}
  async execute(pagination: IPagination): Promise<FindAllDeliveriesResponse> {
    try {
      const { deliveries, total } = await this.deliveryRepository.findAll(
        pagination,
      );

      return {
        deliveries,
        pagination: {
          ...pagination,
          total,
        },
      };
    } catch (error) {
      throw new DATABASE_ERROR(error);
    }
  }
}
