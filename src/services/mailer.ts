import { HttpException, HttpStatus } from '@nestjs/common';
import { SendGridService } from '@anchan828/nest-sendgrid';
import { Injectable } from '@nestjs/common';
import { compile } from 'handlebars';
import { readFileSync } from 'fs';

@Injectable()
export class Mailer {
  constructor(private readonly sendGrid: SendGridService) {}
  async sendOTP(email: string, name: string, otp: number): Promise<any> {
    const data = {
      email,
      name,
      otp,
    };
    try {
      const template = await this.generate(data);
      await this.sendGrid.send({
        to: email,
        from: process.env.FROM_EMAIL,
        subject: 'Account Verification',
        html: template,
      });
    } catch (error) {
      throw new HttpException(
        'Failed to send account verification email',
        HttpStatus.FAILED_DEPENDENCY,
      );
    }
  }

  async generate(data) {
    let hbs;
    const templatePath = 'src/templates/accountVerification.template.hbs';
    try {
      const data = readFileSync(templatePath, 'utf8');
      hbs = data;
    } catch (err) {
      throw new HttpException(
        'Failed to send account verification email',
        HttpStatus.FAILED_DEPENDENCY,
      );
    }
    const template = compile(hbs);
    const html = template(data);
    return html;
  }
}
