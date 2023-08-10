import { Module } from '@nestjs/common';
import { MailerModule } from '@nestjs-modules/mailer';
import { MailerService } from './service/mailer.service'; 
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import * as config from 'config';
import { join } from 'path';

const PROJECT_ROOT = join(__dirname, '..');
const emailConfig = config.get('email');
const host      = emailConfig.host;
const From      = emailConfig.from;
const emailUser = emailConfig.user;
const emailPass = emailConfig.pass;
const port = emailConfig.port;

@Module({
  imports: [
    MailerModule.forRoot({
      transport: {
        host: host,
        port: port, 
        secure: false, 
        auth: {
          user: emailUser,
          pass: emailPass,
        },
      },
      defaults: {
        from: From,
      },
      template: {
      //  dir: __dirname + '/templates',
        dir: join(PROJECT_ROOT, '../../src/modules/mail/templates'),
        adapter: new HandlebarsAdapter(),
        options: {
          strict: true,
        },
      },
    }),],
  providers: [MailerService],
  exports: [MailerService],
})

export class MailModule {}
