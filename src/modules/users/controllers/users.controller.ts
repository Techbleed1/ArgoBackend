/* eslint-disable prettier/prettier */
import {
  Controller,
  Post,
  Get,
  Param,
  Put,
  Delete,
  Body,
  Query, HttpStatus, HttpException
} from "@nestjs/common";
import { User } from '../entities/user.model';
import { CreateUserDto } from '../repository/dto/createuser.dto';
import { UpdateUserDto } from '../repository/dto/updateuser.dto';
import { UsersService } from '../service/users.service';
import { ApiTags } from '@nestjs/swagger';
import { SocialType } from '../enom/social.enum';

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('/create')
  async createUser(@Body() createUserDto: CreateUserDto): Promise<User> {
    return await this.usersService.createUser(createUserDto);
  }

  @Get('/all')
  async findUsers(
    @Query('page') page = 1,
    @Query('limit') limit = 10,
  ): Promise<User[]> {
    return this.usersService.findUsers(page, limit);
  }

  @Get(':id')
  async findUserById(@Param('id') id: string): Promise<User> {
    return this.usersService.findUserById(id);
  }

  @Put(':id')
  async updateUser(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<User> {
    return this.usersService.updateUser(id, updateUserDto);
  }

  @Delete(':id')
  async deleteUser(@Param('id') id: string): Promise<void> {
    return this.usersService.deleteUser(id);
  }

  @Post('/add-social-link')
  async addSocialLink(@Body() data: { userId: string, type: SocialType; link: string },
  ): Promise<{ message: string }> {
    const { userId, type, link } = data;
    if (!Object.values(SocialType).includes(type)) {
      throw new HttpException('Invalid social site type', HttpStatus.BAD_REQUEST);
    }

    await this.usersService.addSocialLink(userId, type, link);
    return { message: 'Social site link added or updated successfully' };
  }

  @Post('/reset-password-otp')
  async resetPasswordSendOtp(@Body() data: { email: string }) {
    await this.usersService.otpForPasswordReset(data.email);
    return { message: 'Password reset email sent.' };
  }

  @Post('/reset-password')
  async resetPassword(
    @Body() data: { email: string; otp: string; newPassword: string },
  ) {
    console.error('Request Body:', data); 
    await this.usersService.passwordReset(
      data.email,
      data.otp,
      data.newPassword,
    );
    return { message: 'Password reset successful.' };
  }
}
