import { Request, Response, NextFunction } from 'express';

import { Container, Service } from 'typedi';
import { CourseModel, StudentModel, TutorModel } from '../model';
import { CustomError } from '../utils/response/custom-error/CustomError';
import { ParsedUrlQuery } from 'querystring';

@Service()
class CourseService {
  constructor(
    private readonly course = CourseModel,
    private readonly student = StudentModel,
    private readonly tutor = TutorModel,
  ) {}

  async getAllCourses(id: any, type: string, next: NextFunction) {
    try {
      if (type == 'student') {
        let user = await this.student.findById(id);
        if (!user) {
          return next(new CustomError(404, 'General', 'User not found'));
        }
        let courses = await this.course.find({});
        return courses;
      }

      return next(new CustomError(400, 'General', 'User not allowed'));
    } catch (error) {
      return next(new CustomError(400, 'Raw', "Can't get courses", null, error));
    }
  }

  async searchCourses(id: any, query: any, next: NextFunction) {
    try {
      let user = await this.student.findById(id);
      if (!user) {
        return next(new CustomError(404, 'General', 'User not found'));
      }
      let courses = await this.course.find({ $text: { $search: query } });
      return courses;
    } catch (error) {}
  }

  async getCourseById(id: any, courseId: any, type: string, next: NextFunction) {
    try {
      if (type == 'student') {
        let user = await this.student.findById(id);
        if (!user) {
          return next(new CustomError(404, 'General', 'User not found'));
        }

        let course = await this.course.findById(courseId);
        if (!course) {
          return next(new CustomError(400, 'General', 'Course not found'));
        }
        return course;
      } else if (type == 'tutor') {
        let tutor = await this.tutor.findById(id);
        if (!tutor) {
          return next(new CustomError(404, 'General', 'User not found'));
        }
        let course = await this.course.findById(courseId);
        if (!course) {
          return next(new CustomError(400, 'General', 'Course not found'));
        }
        return course;
      }

      return next(new CustomError(400, 'General', 'User not allowed'));
    } catch (error) {
      return next(new CustomError(400, 'Raw', "Can't get course", null, error));
    }
  }

  async getTutorCourses(id: any, tutorId: any, next: NextFunction) {
    try {
      let user = await this.student.findById(id);
      if (!user) {
        return next(new CustomError(404, 'General', 'User not found'));
      }
      let tutor = await this.tutor.findById(tutorId);
      if (!tutor) {
        return next(new CustomError(404, 'General', 'Tutor not found'));
      }
      let courses = await this.course.find({ tutor: tutorId });
      return courses;
    } catch (error) {
        console.log(error)
      return next(new CustomError(400, 'Raw', "Can't get courses", null, error));
    }
  }
}

export default CourseService;
