import { IPagination } from 'src/shared/decorators/GetPagination';
import { Delivery } from '../schemas/Delivery.schema';
import { ICreateDelivery } from '../types';

export interface IUpdateDeliveryParams {
  delivery: Delivery;
  id: string;
}

export interface IFindAllDeliveryResponse {
  deliveries: Delivery[];
  total: number;
}
export interface IDeliveryRepository {
  create(delivery: ICreateDelivery): Promise<Delivery>;
  findOne(id: string): Promise<Delivery>;
  update(params: IUpdateDeliveryParams);
  findAll(pagination: IPagination): Promise<IFindAllDeliveryResponse>;
}
