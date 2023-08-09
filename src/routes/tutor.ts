import {Router} from 'express';
import { checkUserJwt } from '../middleware/checkJwt';
import {Container} from 'typedi';

import TutorController from '../controllers/tutor.controllers';

const router = Router();
const tutorController = Container.get(TutorController);

router.post('/create-course',checkUserJwt, tutorController.registerCourse)

router.get('/tutor-courses',checkUserJwt, tutorController.coursesByTutor);

router.get('/tutor', checkUserJwt, tutorController.findOneTutor);

router.patch('/update', checkUserJwt, tutorController.update)

// router.delete('/delete', tutorController.delete)

router.post('/logout', checkUserJwt, tutorController.logOut)

export default router;