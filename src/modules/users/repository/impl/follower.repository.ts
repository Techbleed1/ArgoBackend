import { Model, Promise } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Follower } from '../../entities/follower.model';
import { FollowerRepositoryInterface } from '../interface/follower.repository.interface';

@Injectable()
export class FollowerRepository implements FollowerRepositoryInterface {
  constructor(
    @InjectModel(Follower.name) private readonly followerModel: Model<Follower>,
  ) {}

  async findFollowersById(id: string): Promise<Follower[]> {
    return await this.followerModel.find({ followerId: id }).lean().exec();
  }

  async findFollowingById(id: string): Promise<Follower[]> {
    return await this.followerModel.find({ followingId: id }).lean().exec();
  }

  async findFollowersCountById(id: string): Promise<number> {
    return await this.followerModel.countDocuments({ followerId: id }).exec();
  }

  async findFollowingCountById(id: string): Promise<number> {
    return await this.followerModel.countDocuments({ followingId: id }).exec();
  }
}
