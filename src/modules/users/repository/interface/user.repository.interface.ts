/* eslint-disable prettier/prettier */
import { User } from '../../entities/user.model';
import { CreateUserDto } from '../dto/createuser.dto';
import { PaginationDto } from '../dto/pagination.dto';
import { UpdateUserDto } from '../dto/updateuser.dto';

export interface UserRepositoryInterface {
  createUser(createUserDto: CreateUserDto): Promise<User>;
  findUsers(limit:PaginationDto["limit"], page:PaginationDto["page"]): Promise<{ total:number, users: User []}>;
  findUserById(id: string): Promise<User | null >;
  findUserByEmail(email: string): Promise<User | null>;
  updateUser(id: string, updateUserDto: UpdateUserDto): Promise<User | null>;
  deleteUser(id: string): Promise<void>;
  updateResetToken(email: string, resetToken: string): Promise<void>;
}
