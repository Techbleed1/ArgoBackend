/* eslint-disable prettier/prettier */
import { Body, Controller, Get, Post } from '@nestjs/common';
import { User } from './model/user.model';
import { CreateUserDto } from './repository/dto/createuser.dto';
import { UsersService } from './service/users.service';

@Controller('users')
export class UsersController {
    constructor(private readonly userService: UsersService) {}

    @Post('/create')
    async createUser(@Body() createUserDto: CreateUserDto): Promise<User> {
        return await this.userService.createUser(createUserDto);
    }

    // @Get('/all')
    // async findAllUsers(): Promise<User[]> {
    //     return await this.userService.findAllUsers();
    // }
}
