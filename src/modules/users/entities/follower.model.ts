import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document, SchemaTypes } from 'mongoose';

export type FollowerDocument = Follower & Document;

@Schema()
export class Follower {
  @Prop({ type: SchemaTypes.ObjectId, ref: 'User' })
  followerId: string;

  @Prop({ type: SchemaTypes.ObjectId, ref: 'User' })
  followingId: string;

  @Prop()
  timestamp: Date;
}

export const FollowerSchema = SchemaFactory.createForClass(Follower);
