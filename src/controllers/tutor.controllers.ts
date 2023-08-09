import { Request, Response, NextFunction } from "express";
import { Service } from "typedi";

import TutorService from "../services/tutor.services";

@Service()
class TutorController {
    constructor(
        private readonly tutorService : TutorService
    ){}


    findOneTutor = async(req:Request, res:Response, next:NextFunction) => {
        try{
            let data = await this.tutorService.findOneTutor(req.jwtPayload.id, next);
            if(data != null){
                res.customSuccess(200, 'Fetched Successfully', data);
            };
        }catch{
            next()
        };
    };

    update = async(req:Request, res:Response, next:NextFunction) => {
        try{
            let data = await this.tutorService.update(req.jwtPayload.id, req.body, next);
            if(data != null){
                res.customSuccess(200, 'Updated Successfully', data);
            };
        }catch{
            next()
        };
    };

    logOut = async(req:Request, res:Response, next:NextFunction) => {
        try{
            let data = await this.tutorService.logOut(req.jwtPayload.id, next);
            if(data != null){
                res.customSuccess(200, 'Logout Successfully', data);
            };
        }catch{
            next()
        };
    };

    registerCourse = async(req:Request, res:Response, next:NextFunction) => {
        try{
            let data = await this.tutorService.registerCourse(req.jwtPayload.id, req.body, next);
            if(data != null){
                res.customSuccess(200, 'Course Registered Successfully', data);
            };
        }catch{
            next()
        };
    };

    coursesByTutor = async(req:Request, res:Response, next:NextFunction) => {
        try{
            let data = await this.tutorService.coursesByTutor(req.jwtPayload.id, next);
            if(data != null){
                res.customSuccess(200, 'Fetched Successfully', data);
            };
        }catch{
            next()
        };
    };

    
}

export default TutorController;