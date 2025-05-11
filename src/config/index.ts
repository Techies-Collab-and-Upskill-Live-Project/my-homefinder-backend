import "dotenv/config";
// config({ path: `.env.${process.env.NODE_ENV}` || '.env' });

export const { PORT, JWT_LIFETIME, JWT_SECRET, NODE_ENV, ORIGIN, CREDENTIALS } =
  process.env;
