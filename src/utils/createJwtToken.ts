import jwt from 'jsonwebtoken';

export type JwtPayload = {
  id: string;
  email?: string;
  type: string;
};

export const createUserJwtToken = (payload: JwtPayload): string => {
  return jwt.sign(payload, process.env.STUDENT_JWT_SECRET!, {
    expiresIn: 172800,
  });
};

export const createAdminJwtToken = (payload: JwtPayload): string => {
  return jwt.sign(payload, process.env.ADMIN_JWT_SECRET!, {
    expiresIn: 172800,
  });
};

export const createTutorJwtToken = (payload: JwtPayload): string => {
  return jwt.sign(payload, process.env.TUTOR_JWT_SECRET!, {
    expiresIn: 172800,
  });
};

