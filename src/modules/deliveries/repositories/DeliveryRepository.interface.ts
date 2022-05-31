import { Delivery } from '../schemas/Delivery.schema';
import { ICreateDelivery } from '../types';

export interface IUpdateDeliveryParams {
  delivery: Delivery;
  id: string;
}
export interface IDeliveryRepository {
  create(delivery: ICreateDelivery): Promise<Delivery>;
  findOne(id: string): Promise<Delivery>;
  update(params: IUpdateDeliveryParams);
}
