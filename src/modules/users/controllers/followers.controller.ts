import {
  Controller,
  Post,
  Get,
  Param,
  Body,
  HttpStatus,
  HttpException,
  Query,
  UseGuards,
} from '@nestjs/common';
import { FollowersService } from '../service/followers.service';
import { ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '../../auth/guards/authguard';
@ApiTags('followers')
@Controller('followers')
export class FollowersController {
  constructor(private followersService: FollowersService) {}
  @UseGuards(AuthGuard)
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
  @UseGuards(AuthGuard)
  @Post('/unFollow')
  async unFollowUser(
    @Body() data: { userId: string; followingId: string },
  ): Promise<{ message: string }> {
    await this.followersService.unFollowUser(data.userId, data.followingId);
    return { message: 'User unfollowed successfully' };
  }
  @UseGuards(AuthGuard)
  @Get('/followersList/:userId')
  async getFollowers(
    @Param('userId') userId: string,
    @Query('page') page = 1,
    @Query('limit') limit = 10,
  ): Promise<any> {
    return this.followersService.getFollowers(userId, page, limit);
  }
  @UseGuards(AuthGuard)
  @Get('/followingList/:userId')
  async getFollowing(
    @Param('userId') userId: string,
    @Query('page') page = 1,
    @Query('limit') limit = 10,
  ): Promise<any> {
    return this.followersService.getFollowing(userId, page, limit);
  }
}
