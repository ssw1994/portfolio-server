import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import * as mongoose from 'mongoose';
import { User } from '../../auth/schemas/user.schema';
export type SkillDocument = Skill & Document;
@Schema()
export class Skill {
  @Prop()
  skillName: string;

  @Prop()
  description: string;

  @Prop()
  experience: string;

  @Prop()
  tags: Array<string>;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  userId: User;
}

export const SkillSchema = SchemaFactory.createForClass(Skill);
