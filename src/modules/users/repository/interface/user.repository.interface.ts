/* eslint-disable prettier/prettier */
import { User } from '../../entities/user.model';
import { CreateUserDto } from '../dto/createuser.dto';
import { UpdateUserDto } from '../dto/updateuser.dto';

export interface UserRepositoryInterface {
  createUser(createUserDto: CreateUserDto): Promise<User>;
  findUsers(skip: number, limit: number): Promise<User[]>;
  findUserById(id: string): Promise<User | null>;
  findUserByEmail(email: string): Promise<User | null>;
  updateUser(id: string, updateUserDto: UpdateUserDto): Promise<User | null>;
  deleteUser(id: string): Promise<void>;
}
