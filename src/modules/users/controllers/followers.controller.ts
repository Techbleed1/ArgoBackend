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
  Request,
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
    @Request() req,
    @Body() data: { followingId: string },
  ): Promise<{ message: string }> {
    const userId = req.user.userId;
    const follower = await this.followersService.followUser(
      userId,
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
    @Request() req,
    @Body() data: { followingId: string },
  ): Promise<{ message: string }> {
    const userId = req.user.userId;
    await this.followersService.unFollowUser(userId, data.followingId);
    return { message: 'User unfollowed successfully' };
  }
  @UseGuards(AuthGuard)
  @Get('/followersList')
  async getFollowers(
    @Request() req,
    @Query('page') page = 1,
    @Query('limit') limit = 10,
  ): Promise<any> {
    const userId = req.user.userId;
    return this.followersService.getFollowers(userId, page, limit);
  }
  @UseGuards(AuthGuard)
  @Get('/followingList')
  async getFollowing(
    @Request() req,
    @Query('page') page = 1,
    @Query('limit') limit = 10,
  ): Promise<any> {
    const userId = req.user.userId;
    return this.followersService.getFollowing(userId, page, limit);
  }
}
