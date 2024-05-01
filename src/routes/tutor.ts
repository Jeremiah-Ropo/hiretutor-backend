import {Router} from 'express';
import { checkTutorJwt } from '../middleware/checkJwt';
import {Container} from 'typedi';

import TutorController from '../controllers/tutor.controllers';

const router = Router();
const tutorController = Container.get(TutorController);

router.post('/create-course',checkTutorJwt, tutorController.registerCourse)

router.get('/tutor/courses',checkTutorJwt, tutorController.coursesByTutor);

router.get('/tutor', checkTutorJwt, tutorController.findOneTutor);

router.patch('/update', checkTutorJwt, tutorController.update)

// router.delete('/delete', tutorController.delete)

router.post('/logout', checkTutorJwt, tutorController.logOut)

export default router;