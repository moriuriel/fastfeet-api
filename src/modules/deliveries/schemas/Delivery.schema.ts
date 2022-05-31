import { Prop, SchemaFactory, Schema } from '@nestjs/mongoose';
import { Schema as MongooseSchema } from 'mongoose';
import { DeliveryStatus } from '../types';

@Schema({ timestamps: true, autoCreate: true })
export class Delivery {
  @Prop({ type: MongooseSchema.Types.ObjectId, auto: true })
  _id: string;
  @Prop({
    type: [{ name: { type: String, required: true } }],
  })
  products: { name: string }[];
  @Prop({
    type: {
      number: {
        type: String,
        required: true,
      },
      reference: {
        type: String,
        required: true,
      },
      city: {
        type: String,
        required: true,
      },
      neighborhood: {
        type: String,
        required: true,
      },
      state: {
        type: String,
        required: true,
      },
      postal_code: {
        type: String,
        required: true,
      },
    },
  })
  shipping_address: {
    number: string;
    reference: string;
    city: string;
    neighborhood: string;
    state: string;
    postal_code: string;
  };
  @Prop({
    type: {
      _id: { type: MongooseSchema.Types.ObjectId, required: true },
      name: { type: String, required: true },
    },
  })
  owner: {
    _id: string;
    name: string;
  };
  @Prop({
    type: {
      _id: { type: MongooseSchema.Types.ObjectId },
      name: { type: String },
    },
  })
  delivery_man: {
    _id: string;
    name: string;
  };

  @Prop({ type: Date })
  canceled_at: Date;

  @Prop({ type: Date })
  delivery_date: Date;

  @Prop({ required: true, enum: DeliveryStatus })
  status: string;
}

export type UserDocument = Delivery & Document;

export const UserSchema = SchemaFactory.createForClass(Delivery);
