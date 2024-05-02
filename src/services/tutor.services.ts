import { Request, Response, NextFunction } from "express";
import { StudentModel, TutorModel, CourseModel } from "../model";
import { Service } from "typedi";
import axios from 'axios';


import { CustomError } from "../utils/response/custom-error/CustomError";
import { createUserJwtToken, createAdminJwtToken } from "../utils/createJwtToken";

@Service()
class TutorService {
    constructor(
        private readonly studentModel = StudentModel,
        private readonly course = CourseModel,
        private readonly tutor = TutorModel
    ) { }

    async update(id: any, payload: any, next: NextFunction) {
        try {
            let tutor = await this.tutor.findById(id);

            if (!tutor) {
                return next(new CustomError(400, "General", "Tutor not allowed"));
            }

            const update = await this.tutor.findByIdAndUpdate({ _id: tutor._id }, payload, { new: true });
            delete update.token;
            return update;
        } catch (error) {
            return next(new CustomError(400, "Raw", "Can't update", null, error))
        }
    }


    async logOut(id: any, next: NextFunction) {
        try {
            let user = await this.tutor.findById({ _id: id });
            if (!(user)) {
                return next(new CustomError(403, "General", "Forbidden"))
            }
            let payloadJwt = {
                id: user.id,
                email: user.email,
                type: user.type
            }

            let token = createUserJwtToken(payloadJwt, "1s")
            user.token = token;
            await user.save();

            return { message: "Logout Successfully", token: token };
        } catch (error) {
            return next(new CustomError(400, "Raw", "Can't Login out", null, error))
        }
    };

    async findOneTutor(id: any, next: NextFunction) {
        try {
            let tutor = await this.tutor.findById({ _id: id });
            if (!(tutor)) {
                return next(new CustomError(403, "General", "Forbidden"))
            }
            return tutor;
        } catch (error) {
            return next(new CustomError(500, "Raw", "Can't Login out", null, error))
        }
    };

    async registerCourse(id: any, payload: any, next: NextFunction) {
        try {
            let tutor = await this.tutor.findById(id);
            if (!tutor) {
                return next(new CustomError(400, "General", "Tutor not allowed"))
            };
            let courseExit = await this.course.findOne({ courseCode: payload.courseCode, tutor: tutor._id });
            if (courseExit) {
                courseExit.tutor = tutor._id;
                courseExit.courseTitle = payload.courseTitle;
                courseExit.price = payload.price;
                courseExit.description = payload.description;
                courseExit.courseCode = payload.courseCode;
                await courseExit.save();
                return tutor;
            };
            const course = await this.course.create({
                tutor: tutor._id,
                courseTitle: payload.courseTitle,
                price: payload.price,
                description: payload.description,
                courseCode: payload.courseCode
            });
            tutor.courses.push(course);
            await tutor.save();
            return tutor;

        } catch (error) {
            return next(new CustomError(500, "Raw", "Can't create course", null, error))
        }
    };

    async coursesByTutor(id: any, next: NextFunction) {
        try {
            let tutor = await this.tutor.findById(id);
            if (!tutor) {
                return next(new CustomError(400, "General", "Tutor not found"))
            };
            let courses = await this.course.find({ tutor: tutor.id });
            if (!courses) {
                return next(new CustomError(400, "General", "No courses found"))
            }
            return courses;
        } catch (error) {
            return next(new CustomError(400, "Raw", "Can't Fetch", null, error))
        }
    };

    async delete(id: any, next: NextFunction) {
        try {
            let course = await this.course.findById(id);
            if (!course) {
                return next(new CustomError(400, "General", "Course not found"))
            };

            await this.course.findByIdAndDelete({ _id: course._id });
            return {};
        } catch (error) {
            return next(new CustomError(400, "Raw", "Can't delete", null, error))
        }
    };
}

export default TutorService;