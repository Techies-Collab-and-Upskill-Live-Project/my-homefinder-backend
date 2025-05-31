import nodemailer from 'nodemailer';
import { config } from '../config';
import { EmailTemplates } from '../utils/email-templates.util';

export class EmailService {
  private transporter: nodemailer.Transporter;

  constructor() {
    this.transporter = nodemailer.createTransport({
      host: config.email.host,
      port: config.email.port,
      secure: config.email.port === 465,
      auth: {
        user: config.email.user,
        pass: config.email.pass,
      },
    });
  }

  async sendPasswordResetEmail(email: string, otp: string): Promise<void> {
    try {
      const template = EmailTemplates.passwordResetTemplate(otp, email);
      
      await this.transporter.sendMail({
        from: config.email.from,
        to: email,
        subject: template.subject,
        html: template.html,
        text: template.text,
      });
    } catch (error) {
      console.error('Failed to send password reset email:', error);
      throw new Error('Failed to send password reset email');
    }
  }

  async verifyConnection(): Promise<boolean> {
    try {
      await this.transporter.verify();
      return true;
    } catch (error) {
      console.error('Email service connection failed:', error);
      return false;
    }
  }
}