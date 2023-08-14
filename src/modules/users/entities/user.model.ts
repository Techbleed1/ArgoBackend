/* eslint-disable prettier/prettier */
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UserDocument = User & Document;

@Schema()
export class User {
  @Prop()
  name: string;

  @Prop({required: true, unique: true })
  email: string;

  @Prop()
  password: string;

  @Prop()
  bio: string;

  @Prop()
  profilePicture: string;

  @Prop()
  coverPicutre: string

  @Prop()
  socialSiteLinks: { site: string; link: string }[];

}

export const UserSchema = SchemaFactory.createForClass(User);
