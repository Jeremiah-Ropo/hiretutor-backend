import { Request, Response, NextFunction } from "express";
import { Service } from "typedi";

import UserService from "../services/user.services";

@Service()
class UserController {
    constructor(
        private readonly userService : UserService
    ){}

    register = async(req:Request, res:Response, next:NextFunction) => {
        try{
            let data = await this.userService.register(req.body, next);
            if(data != null){
                res.customSuccess(200, 'User Successfully Create', data);
            };
        }catch{
            next()
        }
    }

    login = async(req:Request, res:Response, next:NextFunction) => {
        try{
            let data = await this.userService.login(req.body, next);
            if(data != null){
                res.customSuccess(200, 'Login Successfully', data);
            };
        }catch(error){
            next(error)
        }
    };

    findOneStudent = async(req:Request, res:Response, next:NextFunction) => {
        try{
            let data = await this.userService.findOneStudent(req.jwtPayload.id, next);
            if(data != null){
                res.customSuccess(200, 'Fetched Successfully', data);
            };
        }catch{
            next()
        };
    };

    getAllCourses = async (req: Request, res: Response, next: NextFunction) => { 
        try{
            let data = await this.userService.getAllCourses(req.jwtPayload.id, next);
            if(data != null){
                res.customSuccess(200, 'Fetched Successfully', data);
            };
        }catch{
            next()
        };
    }

    findOneTutor = async(req:Request, res:Response, next:NextFunction) => {
        try{
            let data = await this.userService.findOneTutor(req.jwtPayload.id, next);
            if(data != null){
                res.customSuccess(200, 'Fetched Successfully', data);
            };
        }catch{
            next()
        };
    };

    pay = async(req:Request, res:Response, next:NextFunction) => {
        try{
            let data = await this.userService.pay(req.jwtPayload, req.body.tutor, next);
            if(data != null){
                res.customSuccess(200, 'Payment link generated successfully', data);
            }
        }catch{
            next()
        }
    };

    payTutor = async(req:Request, res:Response, next:NextFunction) => {
        try{
            let data = await this.userService.payTutor(req.jwtPayload, req.body.courseId, next);
            if(data != null){
                res.customSuccess(200, 'Payment link generated successfully', data);
            }
        }catch{
            next()
        }
    };

    webhook = async(req:Request, res:Response, next:NextFunction) => {
        try{
            let data = await this.userService.webhook(req.body, next);
            if(data != null){
                res.customSuccess(200, 'Payment Successful', data);
            }
        }catch{
            next()
        }
    };


    all = async(req:Request, res:Response, next:NextFunction) => {
        try{
            res.customSuccess(200, '', await this.userService.all(next));
        }catch{
            next()
        }
    }

    logOut = async(req:Request, res:Response, next:NextFunction) => {
        try{
            res.customSuccess(200, '', await this.userService.logOut(req.jwtPayload.id, next));
        }catch{
            next()
        }
    }

    update = async(req:Request, res:Response, next:NextFunction) => {
        try{
            res.customSuccess(200, '', await this.userService.update(req.jwtPayload.id, req.body, next));
        }catch{
            next()
        }
    }

    delete = async(req:Request, res:Response, next:NextFunction) => {
        try{
            res.customSuccess(200, '', await this.userService.delete(req.jwtPayload.id, next));
        }catch{
            next()
        }
    }
}

export default UserController;