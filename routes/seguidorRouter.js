import { Router } from "express";
import { authMiddleware } from "../middlewares/authMiddleware.js";
import { seguirUsuario, dejarDeSeguir } from "../controllers/seguidorController.js";


const router = Router();


router.post('/:id',authMiddleware,seguirUsuario);
router.post(
    '/:id/unfollow',
    authMiddleware,
    dejarDeSeguir
);


export default router;