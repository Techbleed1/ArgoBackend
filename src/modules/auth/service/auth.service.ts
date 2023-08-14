/* eslint-disable prettier/prettier */
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthRepositoryImpl } from '../repository/impl/auth.repositoryImpl';
import { LoginDto } from '../repository/dtos/auth-credentials.dto';
import { JwtService } from "@nestjs/jwt";

@Injectable()
export class AuthService {
  constructor(private readonly authRepository: AuthRepositoryImpl, private jwtService: JwtService) {}

  async login(loginDto: LoginDto) {
    const { email, password } = loginDto;
    const user = await this.authRepository.findUserByEmail(email);
    if (user && user.password === password) {
      const payload = { sub: user.email, username: user.email };
      return {
        access_token: await this.jwtService.signAsync(payload),
      };
    }
    throw new UnauthorizedException();
  }
}
