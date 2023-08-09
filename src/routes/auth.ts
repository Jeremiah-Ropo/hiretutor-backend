import {Router} from 'express';

import {Container} from 'typedi';

import UserController from '../controllers/user.controllers';

const router = Router();
const userController = Container.get(UserController);

router.post('/register', userController.register)

router.get('/all', userController.all);

router.post('/login', userController.login);

// router.post('/login-admin', userController.loginAdmin);

export default router;


