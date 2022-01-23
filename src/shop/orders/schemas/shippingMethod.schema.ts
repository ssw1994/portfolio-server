import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
export type ShippingMethodDocument = ShippingMethod & Document;
@Schema()
export class ShippingMethod {
  @Prop()
  shipping_method: string;
}

export const ShippingMethodSchema = SchemaFactory.createForClass(
  ShippingMethod,
);
