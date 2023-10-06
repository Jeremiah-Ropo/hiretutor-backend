import {Router} from 'express';
import {Container} from 'typedi';

import auth from './auth';
import tutor from './tutor';
import student from './student';
import course from './course';
import UserController from '../controllers/user.controllers';

const userController = Container.get(UserController);

const router = Router();

router.use('/auth', auth);
router.use('/tutor', tutor);
router.use('/student', student);
router.use('/course', course )


router.post('/webhook', userController.webhook);

export default router;
