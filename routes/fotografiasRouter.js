// routes/fotografiaRouter.js

import { Router } from 'express';
import { obtenerFotografia } from '../controllers/fotografiasController.js';

const router = Router();

router.get('/:id', obtenerFotografia);

export default router;