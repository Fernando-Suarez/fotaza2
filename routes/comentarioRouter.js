import {Router} from 'express';
import { authMiddleware } from '../middlewares/authMiddleware.js';
import { crearComentario } from '../controllers/comentarioController.js';
const router = Router();


router.post('/', authMiddleware, crearComentario);




export default router;