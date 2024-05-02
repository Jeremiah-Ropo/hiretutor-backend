export const APP_NAME = "Hire-Tutor";
export const APP_VERSION = "1.0.0";
export const PORT = process.env.PORT || 5000;
export const PRICE = process.env.PRICE;
export const STUDENT_JWT_SECRET = process.env.STUDENT_JWT_SECRET || "000-12345-000";
export const JWT_EXPIRATION = process.env.JWT_EXPIRATION || "172800";
export const TUTOR_JWT_SECRET=process.env.TUTOR_JWT_SECRET || "000-12348-000";
export const DATABASE_URI=process.env.DATABASE_URI || "mongodb://localhost:27017/hire-tutor";
export const BCRYPT_SALT=Number(process.env.BCRYPT_SALT) || 10;
export const role={
        USER: ["student", "tutor", "admin"],
        ADMIN: ["admin"]
    };
export const URL={
        BASE_URL: process.env.BASE_URL || `http://localhost:${PORT}`,
        CLIENT_URL: process.env.CLIENT_URL || `http://localhost:3000`,
    };
export const mailer={
        HOST: process.env.MAILER_HOST || "smtp.gmail.com",
        USER: process.env.MAILER_USER || "username@gmail.com",
        PASSWORD: process.env.MAILER_PASSWORD || "password",
        PORT: process.env.MAILER_PORT || 465,
        SECURE: process.env.MAILER_SECURE || true,
        DOMAIN: "@node-express-starter.com"
    };
export const CLOUDINARY={
        CLOUD_NAME: process.env.CLOUD_NAME,
        API_KEY: process.env.API_KEY,
        API_SECRET: process.env.API_SECRET,
    }