/* eslint-disable prettier/prettier */
import { User } from '../../../users/entities/user.model';
import { AuthCredentialsDto } from '../dtos/auth-credentials.dto';
export interface AuthRepositoryInterface {
  findUserByEmail(email: string): Promise<User | null>;
  // Add additional methods for user CRUD operations
}
