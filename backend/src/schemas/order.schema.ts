import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class Order {
  @Prop()
  film: string;

  @Prop()
  session: string;

  @Prop()
  daytime: string;

  @Prop()
  row: number;

  @Prop()
  seat: number;

  @Prop()
  price: number;

  @Prop()
  id: string;
}

export const OrderSchema = SchemaFactory.createForClass(Order);
