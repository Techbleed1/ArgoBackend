import { Module } from '@nestjs/common';
import { MailerModule } from '@nestjs-modules/mailer';
import { MailerService } from './service/mailer.service'; 
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { join } from 'path';

const PROJECT_ROOT = join(__dirname, '..');

@Module({
  imports: [
    MailerModule.forRoot({
      transport: {
        host: 'smtp-relay.brevo.com',
        port: 587, 
        secure: false, 
        auth: {
          user: 'manissinsh@gmail.com',
          pass: 'mVFr19bIDOB30A8n',
        },
      },
      defaults: {
        from: 'no-reply@example.com',
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
