import {Router} from 'express';
import { getSignUpForm, signUp } from '../controllers/signUpController.js';
import { getLoginForm,login } from '../controllers/loginController.js';

const router = Router();


router.get('/login', getLoginForm);
router.post('/login', login);
router.get('/signup',getSignUpForm);
router.post('/signup', signUp);


export default router;