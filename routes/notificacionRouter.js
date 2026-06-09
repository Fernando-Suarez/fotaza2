import { Router } from "express";
import { authMiddleware } from "../middlewares/authMiddleware.js";
import { listarNotificaciones } from "../controllers/notificacionController.js";

const router = Router();

router.get(
    '/',
    authMiddleware,
    listarNotificaciones
);

export default router;