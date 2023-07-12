import { Controller, Post, Body } from '@nestjs/common';
import { AuthCredentialsDto } from '../repository/dtos/auth-credentials.dto';
import { AuthService } from '../service/auth.service';
import { LoginDto } from '../repository/dtos/auth-credentials.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Login')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @Post('login')
  async login(@Body() loginDto: LoginDto): Promise<any> {
    return this.authService.login(loginDto);
  }
}
