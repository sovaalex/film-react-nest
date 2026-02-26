import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class Schedule {
  @Prop({ required: true, unique: true })
  id: string;

  @Prop({ required: true })
  daytime: Date;

  @Prop({ required: true })
  hall: number;

  @Prop({ required: true })
  rows: number;

  @Prop({ required: true })
  seats: number;

  @Prop({ required: true })
  price: number;

  @Prop([String])
  taken: string[];
}

@Schema()
export class Film {
  @Prop({ required: true, unique: true })
  id: string;

  @Prop({ required: true })
  rating: number;

  @Prop({ required: true })
  director: string;

  @Prop({ type: [String], required: true })
  tags: string[];

  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  about: string;

  @Prop({ required: true })
  description: string;

  @Prop({ required: true })
  image: string;

  @Prop({ required: true })
  cover: string;

  @Prop({ type: [{ type: Object }] })
  schedule: Schedule[];
}

export const FilmSchema = SchemaFactory.createForClass(Film);
