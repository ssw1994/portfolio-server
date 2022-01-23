import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as mongooseSchema } from 'mongoose';
import { TaskStatus } from '../task.model';

export type TaskDocument = Task & Document;

@Schema()
export class Task {
  @Prop()
  title: string;

  @Prop()
  status: TaskStatus;

  @Prop()
  description: string;
}

export const TaskSchema = SchemaFactory.createForClass(Task);
