import {
  Controller,
  Post,
  Get,
  Param,
  Body,
  HttpStatus,
  HttpException,
  Query,
} from '@nestjs/common';
import { FollowersService } from '../service/followers.service';
import { Follower } from '../entities/follower.model';
import { ApiTags } from '@nestjs/swagger';
@ApiTags('followers')
@Controller('followers')
export class FollowersController {
  constructor(private followersService: FollowersService) {}

  @Post('/follow')
  async followUser(
    @Body() data: { userId: string; followingId: string },
  ): Promise<{ message: string }> {
    const follower = await this.followersService.followUser(
      data.userId,
      data.followingId,
    );
    if (!follower) {
      throw new HttpException('Failed to follow user', HttpStatus.BAD_REQUEST);
    }
    return { message: 'User followed successfully' };
  }

  @Post('/unFollow')
  async unFollowUser(
    @Body() data: { userId: string; followingId: string },
  ): Promise<{ message: string }> {
    await this.followersService.unFollowUser(data.userId, data.followingId);
    return { message: 'User unfollowed successfully' };
  }

  @Get('/followersList/:userId')
  async getFollowers(
    @Param('userId') userId: string,
    @Query('page') page = 1,
    @Query('limit') limit = 10,
  ): Promise<any> {
    return this.followersService.getFollowers(userId, page, limit);
  }

  @Get('/followingList/:userId')
  async getFollowing(
    @Param('userId') userId: string,
    @Query('page') page = 1,
    @Query('limit') limit = 10,
  ): Promise<any> {
    return this.followersService.getFollowing(userId, page, limit);
  }
}
