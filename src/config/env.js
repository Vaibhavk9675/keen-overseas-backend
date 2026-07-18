import dotenv from "dotenv";

dotenv.config();

const env = {
  PORT: process.env.PORT || 5000,

  NODE_ENV: process.env.NODE_ENV,

  CLIENT_URL: process.env.CLIENT_URL,

  MONGO_URI: process.env.MONGO_URI,

  EMAIL_USER: process.env.EMAIL_USER,

  EMAIL_PASS: process.env.EMAIL_PASS,
};

export default env;