import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { Product } from '../../products/schemas/product.schema';
import { Cart } from './cart.schema';

export type CartItemDocument = CartItem & Document;

@Schema()
export class CartItem {
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Product' })
  productId: Product;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Cart' })
  cartId: Cart;

  @Prop()
  quantity: number;

  @Prop()
  discount: number;
}

export const CartItemSchema = SchemaFactory.createForClass(CartItem);
