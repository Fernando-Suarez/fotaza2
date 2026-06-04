import {Router} from 'express';
import { getSignUpForm, signUp } from '../controllers/signUpController.js';
import { getLoginForm,login, logout } from '../controllers/loginController.js';
import { autenticadoMiddleware } from '../middlewares/authMiddleware.js';

const router = Router();


router.get('/login',autenticadoMiddleware, getLoginForm);
router.post('/login', login);
router.get('/signup',autenticadoMiddleware,getSignUpForm);
router.post('/signup', signUp);
router.get('/logout', logout);


export default router;