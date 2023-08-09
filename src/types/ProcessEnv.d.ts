declare namespace NodeJS {
  export interface ProcessEnv {
    PORT: string;
    NODE_ENV: string;
    APP_NAME: string;
    APP_VERSION: string;
    DATABASE_URI: string;
    BCRYPT_SALT: string;
    STUDENT_JWT_SECRET: string;
    TUTOR_JWT_SECRET: string;
    MAILER_HOST: string;
    MAILER_USER: string;
    MAILER_PASSWORD: string;
    MAILER_PORT: string;
    MAILER_SECURE: string;
    MAILER_DOMAIN: string;
    BASE_URL: string;
    CLIENT_URL: string;
    API_SECRET: string;
    API_KEY: string;
    CLOUD_NAME: string;
    PAYSTACK_SECRET_KEY: string;
    QPAYSECRET: string;
    LIVE_KEY: string;
    PRICE: string;
  }
}
