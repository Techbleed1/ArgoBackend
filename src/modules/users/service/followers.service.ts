import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Follower, FollowerDocument } from '../entities/follower.model';
import { UserRepository } from '../repository/impl/user.repository';
import { ObjectId } from 'bson';

@Injectable()
export class FollowersService {
  constructor(
    private userRepository: UserRepository,
    @InjectModel(Follower.name) private followerModel: Model<FollowerDocument>,
  ) {}

  async followUser(
    followerId: string,
    followingId: string,
  ): Promise<FollowerDocument> {
    await this.validateUser(followerId);
    const newFollower = new this.followerModel({
      followerId,
      followingId,
      timestamp: new Date(),
    });
    return newFollower.save();
  }

  async unFollowUser(followerId: string, followingId: string) {
    await this.followerModel.deleteOne({ followerId, followingId }).exec();
  }

  async getFollowers(userId: string): Promise<any[]> {
    await this.validateUser(userId);
    const following = await this.followerModel
      .find({ followingId: userId })
      .lean()
      .exec();
    const followingIds = following.map((follow) => follow.followingId);
    const users = await this.userRepository.findUsersByids(followingIds, [
      'id',
      'name',
      'profilePicture',
    ]);
    return users;
  }

  async getFollowing(userId: string): Promise<any[]> {
    await this.validateUser(userId);
    const following = await this.followerModel
      .find({ followerId: userId })
      .lean()
      .exec();
    const followingIds = following.map((follow) => follow.followingId);
    const users = await this.userRepository.findUsersByids(followingIds, [
      'id',
      'name',
      'profilePicture',
    ]);
    return users;
  }

  async validateUser(userId: string) {
    if (!ObjectId.isValid(userId)) {
    throw new NotFoundException('User not found');
  }
    const user = await this.userRepository.findUserById(userId);
    if (!user) {
      throw new NotFoundException('User not found');
    }
  }
}
