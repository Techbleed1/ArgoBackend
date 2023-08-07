/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './modules/users/users.module';
import { ConfigModule } from '@nestjs/config';
import { Logger } from '@nestjs/common';
import { AuthModule } from './modules/auth/auth.module';
import { DevtoolsModule } from '@nestjs/devtools-integration';

const logger = new Logger('app');


// const db_uri1 = 'mongodb://admin:secret@127.0.0.1:27017/dd_argo?auth=flse';
const db_uri1 = 'mongodb+srv://kumargowtham:ZFo5DwppYE6cTaME@cluster0.1ujusku.mongodb.net/?retryWrites=true&w=majority';

@Module({
  imports: [
    MongooseModule.forRoot(db_uri1, {
    }),
    DevtoolsModule.register({
      http: process.env.NODE_ENV !== 'production',
    }),
    UsersModule,
    AuthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
