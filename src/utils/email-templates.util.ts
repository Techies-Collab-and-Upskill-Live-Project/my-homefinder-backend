import { config } from '../config';

export class EmailTemplates {
  static passwordResetTemplate(otp: string, userEmail: string): {
    subject: string;
    html: string;
    text: string;
  } {
    const subject = `Password Reset - ${config.app.name}`;
    
    const html = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <title>Password Reset</title>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background-color: #f8f9fa; padding: 20px; text-align: center; }
          .content { padding: 20px; }
          .otp-code { 
            background-color: #e9ecef; 
            padding: 15px; 
            text-align: center; 
            font-size: 24px; 
            font-weight: bold; 
            letter-spacing: 3px;
            margin: 20px 0;
            border-radius: 5px;
          }
          .footer { background-color: #f8f9fa; padding: 20px; text-align: center; font-size: 12px; }
          .warning { color: #dc3545; font-weight: bold; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>${config.app.name}</h1>
            <h2>Password Reset Request</h2>
          </div>
          
          <div class="content">
            <p>Hello,</p>
            <p>We received a request to reset the password for your account associated with <strong>${userEmail}</strong>.</p>
            
            <p>Your password reset code is:</p>
            <div class="otp-code">${otp}</div>
            
            <p>This code will expire in <strong>${config.otp.expiryMinutes} minutes</strong>.</p>
            
            <p>If you didn't request this password reset, please ignore this email. Your password will remain unchanged.</p>
            
            <p class="warning">For security reasons, never share this code with anyone.</p>
          </div>
          
          <div class="footer">
            <p>This is an automated message from ${config.app.name}. Please do not reply to this email.</p>
          </div>
        </div>
      </body>
      </html>
    `;

    const text = `
      Password Reset - ${config.app.name}
      
      Hello,
      
      We received a request to reset the password for your account associated with ${userEmail}.
      
      Your password reset code is: ${otp}
      
      This code will expire in ${config.otp.expiryMinutes} minutes.
      
      If you didn't request this password reset, please ignore this email. Your password will remain unchanged.
      
      For security reasons, never share this code with anyone.
      
      This is an automated message from ${config.app.name}. Please do not reply to this email.
    `;

    return { subject, html, text };
  }
}