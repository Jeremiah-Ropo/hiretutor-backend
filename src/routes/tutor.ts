import {Router} from 'express';
import { checkTutorJwt } from '../middleware/checkJwt';
import {Container} from 'typedi';

import TutorController from '../controllers/tutor.controllers';

const router = Router();
const tutorController = Container.get(TutorController);

router.post('/course',checkTutorJwt, tutorController.registerCourse)

router.get('/courses',checkTutorJwt, tutorController.coursesByTutor);

router.get('/', checkTutorJwt, tutorController.findOneTutor);

router.patch('/', checkTutorJwt, tutorController.update)

// router.delete('/delete', tutorController.delete)

router.post('/logout', checkTutorJwt, tutorController.logOut)

export default router;