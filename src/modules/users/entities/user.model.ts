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

  @Prop({unique: true })
  userName: string;

  @Prop()
  password: string;

  @Prop()
  bio: string;

  @Prop()
  bioLink: string;

  @Prop()
  profilePicture: string;

  @Prop()
  socialSiteLinks: { site: string; link: string }[];

  @Prop()
  coverPicture: string;

  @Prop()
  gender: string;

  @Prop()
  birthDay: Date;

  @Prop()
  profileTheme: string;

  @Prop()
  profileStyle: string;

  @Prop()
  feedStyle: string;

  @Prop()
  phoneNumber: string;

  @Prop()
  privacy: boolean;

  @Prop()
  showFollow: boolean;

  @Prop()
  showLike: boolean;

  @Prop()
  showDislike: boolean;

  @Prop()
  allowance: number;

}

export const UserSchema = SchemaFactory.createForClass(User);
