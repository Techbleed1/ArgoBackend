import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Follower, FollowerDocument } from '../entities/follower.model';

@Injectable()
export class FollowersService {
  constructor(
    @InjectModel(Follower.name) private followerModel: Model<FollowerDocument>,
  ) {}

  async followUser(
    followerId: string,
    followingId: string,
  ): Promise<FollowerDocument> {
    const newFollower = new this.followerModel({
      followerId,
      followingId,
      timestamp: new Date(),
    });
    return newFollower.save();
  }

  async getFollowers(userId: string): Promise<FollowerDocument[]> {
    return this.followerModel.find({ followingId: userId }).exec();
  }

  async getFollowing(userId: string): Promise<FollowerDocument[]> {
    return this.followerModel.find({ followerId: userId }).exec();
  }
}
