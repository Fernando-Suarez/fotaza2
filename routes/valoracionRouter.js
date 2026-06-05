import {Router} from 'express';
import { authMiddleware } from '../middlewares/authMiddleware.js';
import { crearValoracion } from '../controllers/valoracionController.js';
const router = Router();

router.post('/',authMiddleware,crearValoracion);



export default router;