/* eslint-disable prettier/prettier */
import { Controller, Post, Get, Param, Put, Delete, Body, Query, ValidationPipe } from '@nestjs/common';
import { User } from '../entities/user.model';
import { CreateUserDto } from '../repository/dto/createuser.dto';
import { UpdateUserDto } from '../repository/dto/updateuser.dto';
import { UsersService } from '../service/users.service';
import { ApiTags } from '@nestjs/swagger';
import { PaginationDto } from '../repository/dto/pagination.dto'; 

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
      @Query(new ValidationPipe({ transform: true })) pagination: PaginationDto
    ): Promise<{ total: number; users: User[] }> {
      return this.usersService.findUsers(pagination.limit, pagination.page);
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
}
