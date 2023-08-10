import { Injectable } from '@nestjs/common';
import { AuthRepositoryImpl } from '../repository/impl/auth.repositoryImpl';
import { LoginDto } from '../repository/dtos/auth-credentials.dto';
import { User } from 'src/modules/users/entities/user.model';

@Injectable()
export class AuthService {
  constructor(private readonly authRepository: AuthRepositoryImpl) {}

  async login(loginDto: LoginDto): Promise<User | null> {
    const { email, password } = loginDto;
    const user = await this.authRepository.findUserByEmail(email);
    if (user && user.password === password) {
      return user;
    }
    return null;
  }
}
