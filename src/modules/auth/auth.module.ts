/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { AuthService } from './service/auth.service';
import { AuthController } from './controllers/auth.controller';
import { AuthRepositoryImpl } from './repository/impl/auth.repositoryImpl';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from '../users/entities/user.model';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'User', schema: UserSchema }])],
  providers: [AuthService, AuthRepositoryImpl],
  controllers: [AuthController],
})
export class AuthModule {}
