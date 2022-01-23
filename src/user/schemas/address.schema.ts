import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
export type AddressDocument = Address & Document;

@Schema()
export class Address {
  @Prop()
  addressName: string;

  @Prop()
  city: string;

  @Prop()
  postCode: string;

  @Prop()
  state: string;

  @Prop()
  country: string;

  @Prop()
  street_name: string;

  @Prop()
  street_number: string;

  @Prop()
  isCurrentAddress: string;
}

export const AddressSchema = SchemaFactory.createForClass(Address);
