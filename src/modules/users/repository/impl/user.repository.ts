/* eslint-disable prettier/prettier */
import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from '../../entities/user.model';
import { CreateUserDto } from '../dto/createuser.dto';
import { UpdateUserDto } from '../dto/updateuser.dto';
import { UserRepositoryInterface } from '../interface/user.repository.interface';


@Injectable()
export class UserRepository implements UserRepositoryInterface {
  constructor(@InjectModel(User.name) private readonly userModel: Model<User>) {}

  async createUser(createUserDto: CreateUserDto): Promise<User> {
    const createdUser = new this.userModel(createUserDto);
    return createdUser.save();
  }

  async findUsers(skip: number, limit: number): Promise<User[]> {
    return this.userModel.find().skip(skip).limit(limit).exec();
  }

  async findUserById(id: string): Promise<User | null> {
    return this.userModel.findById(id).exec();
  }

  async findUserByEmail(email: string): Promise<User | null> {
    return this.userModel.findOne({ email }).exec();
  }

  async updateUser(id: string, updateUserDto: UpdateUserDto): Promise<User | null> {
    return this.userModel.findByIdAndUpdate(id, updateUserDto, { new: true }).exec();
  }

  async deleteUser(id: string): Promise<void> {
    await this.userModel.findByIdAndDelete(id).exec();
  }

  async updateResetToken(email: string, resetToken: string): Promise<void> {
    await this.userModel.findOneAndUpdate({ email }, { resetToken }).exec();
  }

  async updatePassword(email: string, password: string): Promise<void> {
    await this.userModel.findOneAndUpdate({ email }, { password }).exec();
  }

  async findUsersByids(userIds: string[], fields: string[]): Promise<User[]> {
    return this.userModel.find({ _id: { $in: userIds } }).select(fields.join(' ')).lean().exec();
  }
}
