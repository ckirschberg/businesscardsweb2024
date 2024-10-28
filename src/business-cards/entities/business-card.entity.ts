import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type BusinessCardDocument = HydratedDocument<BusinessCard>;

@Schema()
export class BusinessCard {
  @Prop()
  name: string;

  @Prop()
  age: number;

  @Prop()
  breed: string;
}

export const BusinessCardSchema = SchemaFactory.createForClass(BusinessCard);