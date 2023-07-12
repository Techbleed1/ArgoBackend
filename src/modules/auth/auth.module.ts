/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { AuthService } from './service/auth.service';
import { AuthController } from './controllers/auth.controller';
import { AuthRepository } from './repository/impl/auth.repository';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from '../users/entities/user.model';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'User', schema: UserSchema }])],
  providers: [AuthService, AuthRepository],
  controllers: [AuthController],
})
export class AuthModule {}
