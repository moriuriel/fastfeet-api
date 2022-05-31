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
