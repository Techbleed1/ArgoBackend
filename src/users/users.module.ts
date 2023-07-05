import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './service/users.service';
import { UserRepository } from './repository/impl/user.repository';
// import { UserRepository } from './repository/interface/user.repository.interface';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './model/user.model';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
  ],
  controllers: [UsersController],
  providers: [UsersService, UserRepository],
})
export class UsersModule {}
