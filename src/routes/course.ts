import { Router } from 'express';
import { checkUserJwt } from '../middleware/checkJwt';
import { Container } from 'typedi';

import CourseController from '../controllers/course.controllers';

const router = Router();
const courseController = Container.get(CourseController);

router.get('/', checkUserJwt, courseController.getAllCourses);

router.get('/:courseId', checkUserJwt, courseController.getCourseById);

router.get('/search/', checkUserJwt, courseController.searchCourses);
 
router.get('/tutor/:tutorId', checkUserJwt, courseController.getTutorCourses);


export default router;