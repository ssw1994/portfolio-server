import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import * as mongoose from 'mongoose';
import { Skill } from '../../skill/schema/skill.schema';
import { Task } from '../../task/task.model';
import { Cart } from '../../shop/carts/schemas/cart.schema';
export type UserDocument = User & Document;

@Schema()
export class User {
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User', auto: true })
  _id: User;

  @Prop({ unique: true })
  username: string;

  @Prop()
  password: string;

  @Prop([{ type: mongoose.Schema.Types.ObjectId, ref: 'Skill' }])
  skills: Array<Skill>;

  @Prop([{ type: mongoose.Schema.Types.ObjectId, ref: 'Task' }])
  tasks: Array<Task>;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Cart' })
  cartId: Cart;
}

export const UserSchema = SchemaFactory.createForClass(User);
