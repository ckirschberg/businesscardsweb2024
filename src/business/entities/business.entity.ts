import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { BusinessCard } from "../../business-cards/entities/business-card.entity";
import * as mongoose from "mongoose";

export type BusinessDocument = mongoose.HydratedDocument<Business>;

@Schema()
export class Business {
    @Prop()
    name: string;

    @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: BusinessCard.name }], default: [] })
    businessCards: BusinessCard[];
}

export const BusinessSchema = SchemaFactory.createForClass(Business);