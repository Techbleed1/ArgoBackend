/* eslint-disable prettier/prettier */
import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus, NotFoundException,
  Param, Patch,
  Post,
  Put,
  Query, UseGuards,
  ValidationPipe
} from "@nestjs/common";
import { User } from "../entities/user.model";
import { CreateUserDto } from "../repository/dto/createuser.dto";
import { UpdateUserDto } from "../repository/dto/updateuser.dto";
import { UsersService } from "../service/users.service";
import { ApiTags } from "@nestjs/swagger";
import { SocialType } from "../enom/social.enum";
import { PaginationDto } from "../repository/dto/pagination.dto";
import { AuthGuard } from "../../auth/guards/authguard";
import { UpdateSettingDto } from "../repository/dto/updateSetting.dto";

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}
  @UseGuards(AuthGuard)
  @Post('/create')
  async createUser(@Body() createUserDto: CreateUserDto): Promise<User> {
    return await this.usersService.createUser(createUserDto);
  }
    @UseGuards(AuthGuard)
    @Get('/all')
    async findUsers(
      @Query(new ValidationPipe({ transform: true })) pagination: PaginationDto
    ): Promise<{ total: number; users: User[] }> {
      return this.usersService.findUsers(pagination);
    }
  @UseGuards(AuthGuard)
  @Get(':id')
  async findUserById(@Param('id') id: string): Promise<User> {
    return this.usersService.findUserById(id);
  }
  @UseGuards(AuthGuard)
  @Put(':id')
  async updateUser(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<User> {
    return this.usersService.updateUser(id, updateUserDto);
  }
  @UseGuards(AuthGuard)
  @Delete(':id')
  async deleteUser(@Param('id') id: string): Promise<void> {
    return this.usersService.deleteUser(id);
  }
  @UseGuards(AuthGuard)
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
  @UseGuards(AuthGuard)
  @Get('/profile/:userId')
  async getUserInfo(@Param('userId') userId: string) {
    return await this.usersService.getUserProfileInfo(userId);
  }
  @UseGuards(AuthGuard)
  @Post('/reset-password-otp')
  async resetPasswordSendOtp(@Body() data: { email: string }) {
    await this.usersService.otpForPasswordReset(data.email);
    return { message: 'Password reset email sent.' };
  }
  @UseGuards(AuthGuard)
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
  @UseGuards(AuthGuard)
  @Put('/updateSetting/:userId')
  async updateSetting(
    @Param('userId') userId: string,
    @Body() updateSettingDto: UpdateSettingDto,
  ): Promise<any> {
    const updatedUser = await this.usersService.updateSetting(userId, updateSettingDto);
    if (!updatedUser) {
      throw new NotFoundException('User not found');
    }
    return { message: 'User setting updated successfully' };
  }
  @UseGuards(AuthGuard)
  @Get('/getSetting/:userId')
  async getUserSelectedFields(
    @Param('userId') userId: string,
  ): Promise<Partial<User>> {
    return this.usersService.getUserSetting(userId);
  }
}
