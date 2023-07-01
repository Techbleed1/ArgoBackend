import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { UserRepository } from '../repository/interface/user.repository.interface';
import { Model } from 'mongoose';
import { User } from '../model/user.model';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<User>,
  ) {}
}
