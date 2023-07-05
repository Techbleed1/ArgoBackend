import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { UserRepository } from '../repository/impl/user.repository';
import { Model } from 'mongoose';
import { User } from '../model/user.model';
import { CreateUserDto } from '../repository/dto/createuser.dto';

@Injectable()
export class UsersService {
  constructor(private userRepository: UserRepository) {}

  async createUser(user: User): Promise<User> {
    return this.userRepository.createUser(user);
  }
}
