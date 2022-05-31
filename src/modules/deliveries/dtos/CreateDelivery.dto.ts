import { Type } from 'class-transformer';
import {
  ArrayNotEmpty,
  IsArray,
  IsMongoId,
  IsNotEmpty,
  IsString,
  ValidateNested,
} from 'class-validator';

class DeliveryOwnerDto {
  @IsMongoId()
  @IsNotEmpty()
  _id: string;

  @IsString()
  @IsNotEmpty()
  name: string;
}

class DeliveryProductDto {
  @IsString()
  @IsNotEmpty()
  name: string;
}

class DeliveryShippingAddressDto {
  @IsString()
  @IsNotEmpty()
  number: string;

  @IsString()
  @IsNotEmpty()
  reference: string;

  @IsString()
  @IsNotEmpty()
  city: string;

  @IsString()
  @IsNotEmpty()
  neighborhood: string;

  @IsString()
  @IsNotEmpty()
  state: string;

  @IsString()
  @IsNotEmpty()
  postal_code: string;
}

export class CreateDeliveryDto {
  @IsArray()
  @ArrayNotEmpty()
  @ValidateNested() // perform validation on children too
  @Type(() => DeliveryProductDto) // cast the payload to the correct DTO type
  products: DeliveryProductDto[];

  @IsNotEmpty()
  @ValidateNested()
  @Type(() => DeliveryShippingAddressDto)
  shipping_address: DeliveryShippingAddressDto;

  @IsNotEmpty()
  @ValidateNested()
  @Type(() => DeliveryOwnerDto)
  owner: DeliveryOwnerDto;
}
