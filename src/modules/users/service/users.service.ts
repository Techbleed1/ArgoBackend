import {
  Injectable,
  ConflictException,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { UserRepository } from '../repository/impl/user.repository';
import { Model } from 'mongoose';
import { User } from '../entities/user.model';
import { CreateUserDto } from '../repository/dto/createuser.dto';
import { UpdateUserDto } from '../repository/dto/updateuser.dto';

@Injectable()
export class UsersService {
  constructor(private userRepository: UserRepository) {}

  async createUser(createUserDto: CreateUserDto): Promise<User> {
    const { email } = createUserDto;
    const existingUser = await this.userRepository.findUserByEmail(email);
    if (existingUser) {
      throw new ConflictException('Email already exists');
    }
    return this.userRepository.createUser(createUserDto);
  }

  async findUsers(page: number, limit: number): Promise<User[]> {
    const skip = (page - 1) * limit;
    return this.userRepository.findUsers(skip, limit);
  }

  async findUserById(id: string): Promise<User | null> {
    const user = await this.userRepository.findUserById(id);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }

  async findUserByEmail(email: string): Promise<User | null> {
    return this.userRepository.findUserByEmail(email);
  }

  async updateUser(
    id: string,
    updateUserDto: UpdateUserDto,
  ): Promise<User | null> {
    const updatedUser = await this.userRepository.updateUser(id, updateUserDto);
    if (!updatedUser) {
      throw new NotFoundException('User not found');
    }
    return updatedUser;
  }

  async deleteUser(id: string): Promise<void> {
    const deletedCount = await this.userRepository.deleteUser(id);
    // if (deletedCount === 0) {
    //   throw new NotFoundException('User not found');
    // }
  }
}
