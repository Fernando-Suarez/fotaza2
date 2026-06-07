import {Router} from 'express';
import { authMiddleware } from '../middlewares/authMiddleware.js';
import { upload } from '../utils/multer.js';
import { getPerfil,obtenerAvatar,actualizarAvatar } from '../controllers/perfilController.js';


const router = Router();

router.get('/',authMiddleware, getPerfil );
router.get('/avatar/:id', obtenerAvatar);
router.post(
    '/avatar',
    authMiddleware,
    upload.single('avatar'),
    actualizarAvatar
);



export default router;