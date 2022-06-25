import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import * as mongoose from 'mongoose';
import { Cart } from '../../carts/schemas/cart.schema';
import { ShippingMethod } from './shippingMethod.schema';
import { User } from 'src/auth/schemas/user.schema';
import { Address } from './address.schema';
import { Contact } from './contacts.schema';
export type OrderDocument = Order & Document;
@Schema()
export class Order {
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Cart' })
  cartId: Cart;

  @Prop()
  orderTotal: number;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'ShippingMethod' })
  shipping_method: ShippingMethod;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Address' })
  address: Address;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  userId: User;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Contact' })
  contactId: Contact;

  @Prop()
  discount: number;
}

export const OrderSchema = SchemaFactory.createForClass(Order);
