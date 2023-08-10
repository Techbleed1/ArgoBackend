import { Injectable } from '@nestjs/common';
import { MailerService as MailService }  from '@nestjs-modules/mailer';


@Injectable()
export class MailerService {
  constructor(private readonly mailService: MailService) {}

  async sendPasswordResetEmail(to: string, otp: string) {
    console.log('log', );
    await this.mailService.sendMail({
        from: 'no-reply@argo.com',
        to,
        subject: 'Password Reset OTP',
        template: './otp',
        context: { otp },
    });
  }
  
}
