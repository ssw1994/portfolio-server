import { IsNotEmpty, IsOptional } from 'class-validator';
import * as mongoose from 'mongoose';

export class CreateOrderDto {
  @IsNotEmpty()
  cartId: mongoose.Schema.Types.ObjectId;

  @IsOptional()
  shipping_method: mongoose.Schema.Types.ObjectId;

  @IsNotEmpty()
  address: mongoose.Schema.Types.ObjectId;

  @IsNotEmpty()
  contact: mongoose.Schema.Types.ObjectId;
}
