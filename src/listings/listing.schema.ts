import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ListingDocument = Listing & Document;

@Schema({ timestamps: true })
export class Listing {
  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  description: string;

  @Prop({ required: true })
  price: number;

  @Prop({ required: true })
  location: string;

  @Prop([String])
  images: string[];

  @Prop({ default: 1 })
  guests: number;

  @Prop({ default: 1 })
  bedrooms: number;

  @Prop({ default: 1 })
  bathrooms: number;

  @Prop([String])
  amenities: string[];

  @Prop()
  propertyType: string;

  @Prop({ default: 0 })
  rating: number;

  @Prop({ default: 0 })
  reviewsCount: number;

  @Prop()
  category: string;
}

export const ListingSchema = SchemaFactory.createForClass(Listing);
