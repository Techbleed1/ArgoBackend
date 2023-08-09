import { Injectable } from '@nestjs/common';
import { MailerService as MailService }  from '@nestjs-modules/mailer';


@Injectable()
export class MailerService {
  constructor(private readonly mailService: MailService) {}

 // const templatePath = path.join(__dirname, '../../templates/reset-otp');

  async sendPasswordResetEmail(to: string, otp: string) {
    console.log('log', otp);
    await this.mailService.sendMail({
        from: 'no-reply@argo.com',
        to,
        subject: 'Password Reset OTP',
        template: '../templates/reset-otp',
        context: { otp },
    });
  }
}
