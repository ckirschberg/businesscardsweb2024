import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { BusinessCard } from '../../business-cards/entities/business-card.entity';
import * as mongoose from 'mongoose';

export type BusinessDocument = HydratedDocument<Business>;

@Schema()
export class Business {
  @Prop()
  name: string;

  @Prop([BusinessCard])
  businessCards: BusinessCard[]
}
export const BusinessSchema = SchemaFactory.createForClass(Business);