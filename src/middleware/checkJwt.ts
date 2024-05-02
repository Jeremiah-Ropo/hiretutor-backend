import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

import { JwtPayload } from '../utils/createJwtToken';
import { CustomError } from '../utils/response/custom-error/CustomError';

export const checkUserJwt = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.get('Authorization');
  if (!authHeader) {
    const customError = new CustomError(400, 'General', 'Authorization header not provided');
    return next(customError);
  }

  const token = authHeader.split(' ')[1];
  
  let jwtPayload: { [key: string]: any };
  try {
    jwtPayload = jwt.verify(token, process.env.STUDENT_JWT_SECRET as string) as { [key: string]: any };
    req.jwtPayload = jwtPayload as JwtPayload;
    next();
  } catch (err) {
    return next(new CustomError(401, 'Raw', 'JWT error', false, "Invalid token/You don't have authorization to access this resource"));
  }
};

export const checkTutorJwt = (req:Request, res:Response, next:NextFunction) => {
  const authHeader = req.get("Authorization");
  if(!authHeader){
    return next(new CustomError(400, "General", 'Authorization header not provided'));
  }
  const token = authHeader.split(' ')[1];

  let jwtPayload: {[key: string]: any};
  try{
    jwtPayload = jwt.verify(token, process.env.TUTOR_JWT_SECRET as string) as {[key:string]:any};
    req.jwtPayload = jwtPayload as JwtPayload;
    next();
  }catch(error){
    return next(new CustomError(401, "Raw", 'JWT error', false, "Invalid token/You don't have authorization to access this resource"))
  }
}


