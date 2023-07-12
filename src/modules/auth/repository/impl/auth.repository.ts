/* eslint-disable prettier/prettier */
// import { Repository, EntityRepository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from '../../../users/entities/user.model';

@Injectable()
export class AuthRepository implements AuthRepository {
  constructor(@InjectModel('User') private readonly userModel: Model<User>) {}

  // Implement methods for user CRUD operations, such as createUser, findByUsername, etc.
  async findUserByEmail(email: string): Promise<User | null> {
    return this.userModel.findOne({ email }).exec();
  }
}
