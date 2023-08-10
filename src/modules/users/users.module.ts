import { Module } from '@nestjs/common';
import { UsersController } from './controllers/users.controller';
import { UsersService } from './service/users.service';
import { UserRepository } from './repository/impl/user.repository';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './entities/user.model';
import { MailModule } from '../mail/mail.module';

@Module({
  imports: [MailModule,
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
  ],
  controllers: [UsersController],
  providers: [UsersService, UserRepository],
})
export class UsersModule {}
