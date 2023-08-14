import { Module } from '@nestjs/common';
import { UsersController } from './controllers/users.controller';
import { UsersService } from './service/users.service';
import { UserRepository } from './repository/impl/user.repository';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './entities/user.model';
import { MailModule } from '../mail/mail.module';
import { FollowersController } from './controllers/followers.controller';
import { FollowersService } from './service/followers.service';
import { Follower, FollowerSchema } from './entities/follower.model';

@Module({
  imports: [
    MailModule,
    MongooseModule.forFeature([
      { name: User.name, schema: UserSchema },
      { name: Follower.name, schema: FollowerSchema },
    ]),
  ],
  controllers: [UsersController, FollowersController],
  providers: [UsersService, UserRepository, FollowersService],
})
export class UsersModule {}
