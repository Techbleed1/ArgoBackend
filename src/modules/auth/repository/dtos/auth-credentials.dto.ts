/* eslint-disable prettier/prettier */
import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";

export class AuthCredentialsDto {
// @ApiProperty
  username: string;
  password: string;
}

export class LoginDto {
  email: string;
  password: string;
}