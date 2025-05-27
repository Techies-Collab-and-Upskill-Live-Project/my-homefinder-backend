import "dotenv/config";
// config({ path: `.env.${process.env.NODE_ENV}` || '.env' });

export const {
  PORT,
  JWT_LIFETIME,
  JWT_SECRET,
  NODE_ENV,
  ORIGIN,
  CREDENTIALS,
  CLOUDINARY_CLOUD_NAME,
  CLOUDINARY_API_KEY,
  CLOUDINARY_API_SECRET,
} = process.env;
