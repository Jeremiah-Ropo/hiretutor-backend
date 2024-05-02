import {Router} from 'express';
import { checkUserJwt } from '../middleware/checkJwt';
import {Container} from 'typedi';

import UserController from '../controllers/user.controllers';

const router = Router();
const userController = Container.get(UserController);


router.get('/', checkUserJwt, userController.findOneStudent);

router.post('/payment-access', checkUserJwt, userController.pay);

router.post('/pay-tutor', checkUserJwt, userController.payTutor);

router.patch('/', checkUserJwt, userController.update)

router.delete('/', userController.delete)

router.post('/logout', checkUserJwt, userController.logOut)

export default router;


