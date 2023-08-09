import { Module } from '@nestjs/common';
import { MailerModule } from '@nestjs-modules/mailer';
import { MailerService } from './mailer/mailer.service'; 

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
    }),],
  providers: [MailerService],
  exports: [MailerService],
})
export class MailModule {}
