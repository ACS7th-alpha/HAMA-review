import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ReviewDocument = Review & Document;

@Schema({ timestamps: true })
export class Review {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  description: string;

  @Prop({ required: true })
  ageGroup: string;

  @Prop({ required: true })
  purchaseLink: string;

  @Prop({ required: true })
  recommended: boolean;

  @Prop({ required: true })
  imageUrls: string[];

  @Prop({ required: true })
  thumbnailUrls: string[];

  @Prop({ required: true })
  googleId: string;

  @Prop()
  userId: string;

  @Prop()
  content: string;

  @Prop()
  rating: number;
}

export const ReviewSchema = SchemaFactory.createForClass(Review);
