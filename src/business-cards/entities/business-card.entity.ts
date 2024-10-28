import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type BusinessCardDocument = HydratedDocument<BusinessCard>;

@Schema()
export class BusinessCard {
  @Prop()
  firstname: string;

  @Prop()
  lastname: string;

  @Prop()
  title: string;

  @Prop()
  email: string;

  @Prop()
  about: string;

  @Prop()
  interests: string;
}

export const BusinessCardSchema = SchemaFactory.createForClass(BusinessCard);