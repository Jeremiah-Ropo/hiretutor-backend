import { response, Response } from 'express';

response.customSuccess = function (httpStatusCode: number, message:string, data: any = null, success:boolean = true): Response {
  return this.status(httpStatusCode).json({message, success, data});
};
