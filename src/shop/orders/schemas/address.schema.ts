import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import * as mongoose from 'mongoose';
import { User } from 'src/auth/schemas/user.schema';
import { Order } from './order.schema';
export type AddressDocument = Address & Document;
@Schema()
export class Address {
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  userId: User;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Order' })
  orderId: Order;

  @Prop()
  country: string;

  @Prop()
  countryName: string;

  @Prop()
  state: string;

  @Prop()
  stateName: string;

  @Prop()
  city: string;

  @Prop()
  postal_code: string;

  @Prop()
  street_name: string;

  @Prop()
  street_number: string;

  @Prop()
  addressType: string;

  @Prop()
  landMark: string;
}

export const AddressSchema = SchemaFactory.createForClass(Address);
