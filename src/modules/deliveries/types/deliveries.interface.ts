import { IPagination } from 'src/shared/decorators/GetPagination/GetPagination.interface';
import { Delivery } from '../schemas/Delivery.schema';

export interface IDeliveryOwner {
  _id: string;
  name: string;
}

export interface IDeliveryProduct {
  name: string;
}

export interface IDeliveryShippingAddress {
  number: string;
  reference: string;
  city: string;
  neighborhood: string;
  state: string;
  postal_code: string;
}

export interface ICreateDelivery {
  products: IDeliveryProduct[];
  shipping_address: IDeliveryShippingAddress;
  owner: IDeliveryOwner;
}

export interface IAccepDeliveryServiceParams {
  deliveryManId: string;
  deliveryId: string;
}

export interface FindAllDeliveriesResponse {
  deliveries: Delivery[];
  pagination: IPagination;
}
