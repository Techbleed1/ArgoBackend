import { Controller, Post, Get, Param, UseGuards } from '@nestjs/common';
import { FollowersService } from '../service/followers.service';
import { Follower } from '../entities/follower.model';
import { ApiTags } from '@nestjs/swagger';
@ApiTags('followers')
@Controller('followers')
export class FollowersController {
  constructor(private followersService: FollowersService) {}

  @Post(':followerId/:followingId')
  async followUser(
    @Param('followerId') followerId: string,
    @Param('followingId') followingId: string,
  ): Promise<Follower> {
    return this.followersService.followUser(followerId, followingId);
  }

  @Get(':userId/followers')
  async getFollowers(@Param('userId') userId: string): Promise<Follower[]> {
    return this.followersService.getFollowers(userId);
  }

  @Get(':userId/following')
  async getFollowing(@Param('userId') userId: string): Promise<Follower[]> {
    return this.followersService.getFollowing(userId);
  }
}
