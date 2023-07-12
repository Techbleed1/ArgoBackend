/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './modules/users/users.module';
import { ConfigModule } from '@nestjs/config';
import { Logger } from '@nestjs/common';
import { AuthModule } from './modules/auth/auth.module';

const logger = new Logger('app');

const db_uri1 = 'mongodb://admin:secret@127.0.0.1:27017/dd_argo?auth=flse';
// const db_uri1 = 'mongodb://'+process.env.MONGODB_URI;

@Module({
  imports: [
    MongooseModule.forRoot(db_uri1, {
    }),
    UsersModule,
    AuthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
