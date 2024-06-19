import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type NoteDocument = HydratedDocument<Note>;

@Schema()
export class Note {
  @Prop()
  title: string;

  @Prop()
  last_updated_date: Date;

  @Prop()
  content: string;
}

export const NoteSchema = SchemaFactory.createForClass(Note);