import dotenv from 'dotenv';

dotenv.config();

export const port  = process.env.PORT;
export const dbURL = process.env.DATABASE_URL;
export const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;
export const WEB_URL = process.env.WEB_URL;
export const APP_PASSWORD = process.env.APP_PASSWORD;
export const CLOUD_NAME = process.env.CLOUD_NAME;
export const CLOUDINARY_API_KEY= process.env.CLOUDINARY_API_KEY;
export const CLOUDINARY_API_SECRET_KEY = process.env.CLOUDINARY_API_SECRET_KEY;
