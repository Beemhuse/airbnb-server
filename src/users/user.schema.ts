import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UserDocument = User & Document;

@Schema({ timestamps: true })
export class User {
  @Prop({ required: true, unique: true })
  email: string;

  @Prop()
  password?: string;

  @Prop()
  firstName: string;

  @Prop()
  lastName: string;

  @Prop()
  country: string;

  @Prop()
  phone: string;

  @Prop()
  birthDate: string;

  @Prop({ default: false })
  agreedToCommunity: boolean;

  @Prop()
  profilePhoto?: string;

  @Prop()
  otp?: string;

  @Prop()
  otpExpires?: Date;
}

export const UserSchema = SchemaFactory.createForClass(User);
