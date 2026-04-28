import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Resend } from 'resend';

@Injectable()
export class MailService {
  private resend: Resend;

  constructor(private configService: ConfigService) {
    this.resend = new Resend(this.configService.get<string>('RESEND_API_KEY'));
  }

  async sendOtp(email: string, otp: string) {
    try {
      await this.resend.emails.send({
        from: 'Airbnb <no-reply@karteq.com.ng>',
        to: email,
        subject: 'Your Airbnb Verification Code',
        html: `<p>Your verification code is: <strong>${otp}</strong></p>`,
      });
      return true;
    } catch (error) {
      console.error('Failed to send email:', error);
      return false;
    }
  }
}
