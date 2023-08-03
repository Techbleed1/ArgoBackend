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
import { PostsModule } from './posts/posts.module';
import { Src\modules\posts\controllers\postsController } from './src/modules/posts/controllers/posts/src/modules/posts/controllers/posts.controller';
import { PostsController } from './modules/posts/controllers/posts.controller';

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
    AuthModule,
    PostsModule],
  controllers: [AppController, Src\modules\posts\controllers\postsController, PostsController],
  providers: [AppService],
})
export class AppModule {}
