import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import * as mongoose from 'mongoose';
import { User } from 'src/auth/schemas/user.schema';
import { Order } from './order.schema';
export type ContactDocument = Contact & Document;

@Schema()
export class Contact {
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Order' })
  orderId: Order;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  userId: User;

  @Prop()
  firstName: string;

  @Prop()
  lastName: string;

  @Prop()
  mobile: string;

  @Prop()
  email: string;
}

export const ContactSchema = SchemaFactory.createForClass(Contact);
