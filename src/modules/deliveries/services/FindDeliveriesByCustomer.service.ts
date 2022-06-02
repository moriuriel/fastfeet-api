import { Inject, Injectable } from '@nestjs/common';
import { IPagination } from 'src/shared/decorators/GetPagination/GetPagination.interface';
import { DATABASE_ERROR } from 'src/shared/errors/exceptions';
import { DeliveryRepository, IDeliveryRepository } from '../repositories';
import { FindAllDeliveriesResponse } from '../types';

@Injectable()
export class FindAllDeliveriesByCustomerService {
  constructor(
    @Inject(DeliveryRepository)
    private readonly deliveryRepository: IDeliveryRepository,
  ) {}
  async execute(
    pagination: IPagination,
    customerId: string,
  ): Promise<FindAllDeliveriesResponse> {
    try {
      const { deliveries, total } =
        await this.deliveryRepository.findAllByOwnerId(pagination, customerId);

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
