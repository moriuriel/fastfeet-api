import { Delivery } from '../schemas/Delivery.schema';
import { ICreateDelivery } from '../types';

export interface IDeliveryRepository {
  create(delivery: ICreateDelivery): Promise<Delivery>;
}
