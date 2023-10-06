import { Request, Response, NextFunction } from 'express';
import { Service } from 'typedi';

import { CustomError } from '../utils/response/custom-error/CustomError';
import  CourseService  from '../services/course.services';

@Service()
class CourseController {
    constructor(
        private readonly courseService : CourseService
    ) { }
    
    getAllCourses = async (req: Request, res: Response, next: NextFunction) => {
        try {
            let data = await this.courseService.getAllCourses(req.jwtPayload.id, req.jwtPayload.type, next);
            if (data != null) {
                res.customSuccess(200, 'Fetched Successfully', data);
            };
        } catch {
            next()
        };
    };

    getCourseById = async (req: Request, res: Response, next: NextFunction) => {
        try {
            let data = await this.courseService.getCourseById(req.jwtPayload.id, req.params.courseId, req.jwtPayload.type, next);
            if (data != null) {
                res.customSuccess(200, 'Fetched Successfully', data);
            }
        } catch {
            next()
        };
    };

    getTutorCourses = async (req: Request, res: Response, next: NextFunction) => {
        try {
            let data = await this.courseService.getTutorCourses(req.jwtPayload.id, req.params.tutorId, next);
            if (data != null) {
                res.customSuccess(200, 'Fetched Successfully', data);
            };
        } catch {
            next()
        };
    };

    searchCourses = async (req: Request, res: Response, next: NextFunction) => { 
        try {   
            let data = await this.courseService.searchCourses(req.jwtPayload.id, req.query, next);
            if (data != null) {
                res.customSuccess(200, 'Fetched Successfully', data);
            };
        } catch {
            next()
        };
    }
}

export default CourseController;
