import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Product } from '../../products/schemas/product.schema';
import * as mongoose from 'mongoose';
import { CartItem } from './cartItem.schema';
export type CartDocument = Cart & Document;
@Schema()
export class Cart {
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Cart', auto: true })
  _id: Cart;

  @Prop([{ type: mongoose.Schema.Types.ObjectId, ref: 'CartItem' }])
  products: Array<CartItem>;
}

export const CartSchema = SchemaFactory.createForClass(Cart);
