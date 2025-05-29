import "dotenv/config";
// config({ path: `.env.${process.env.NODE_ENV}` || '.env' });


import dotenv from 'dotenv';

dotenv.config();

export const { PORT, JWT_LIFETIME, JWT_SECRET, NODE_ENV, ORIGIN, CREDENTIALS, CLOUDINARY_CLOUD_NAME,
  CLOUDINARY_API_KEY,
  CLOUDINARY_API_SECRET } =
  process.env;


export const config = {
  database: {
    url: process.env.DATABASE_URL!,
  },
  email: {
    host: process.env.EMAIL_HOST!,
    port: parseInt(process.env.EMAIL_PORT || '587'),
    user: process.env.EMAIL_USER!,
    pass: process.env.EMAIL_PASS!,
    from: process.env.EMAIL_FROM!,
  },
  jwt: {
    secret: process.env.JWT_SECRET!,
  },
  otp: {
    expiryMinutes: parseInt(process.env.OTP_EXPIRY_MINUTES || '15'),
  },
  app: {
    name: 'My Home Finder',
    url: process.env.APP_URL || 'http://localhost:3000',
  },
  
};

