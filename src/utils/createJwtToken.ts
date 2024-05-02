import jwt from 'jsonwebtoken';

import { JWT_EXPIRATION } from "../config";

export type JwtPayload = {
  id: string;
  email?: string;
  type: string;
};

export const createUserJwtToken = (payload: JwtPayload, expiresIn?:string): string => {
  return jwt.sign(payload, process.env.STUDENT_JWT_SECRET!, {
    expiresIn: expiresIn || JWT_EXPIRATION,
  });
};

export const createAdminJwtToken = (payload: JwtPayload): string => {
  return jwt.sign(payload, process.env.ADMIN_JWT_SECRET!, {
    expiresIn: JWT_EXPIRATION,
  });
};

export const createTutorJwtToken = (payload: JwtPayload, expiresIn?:string): string => {
  return jwt.sign(payload, process.env.TUTOR_JWT_SECRET!, {
    expiresIn: expiresIn || JWT_EXPIRATION,
  });
};

