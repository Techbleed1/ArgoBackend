import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './service/users.service';
import { UserRepositoryImpl } from './repository/impl/user.repository';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './model/user.model';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
  ],
  controllers: [UsersController],
  providers: [UsersService, UserRepositoryImpl],
})
export class UsersModule {}
