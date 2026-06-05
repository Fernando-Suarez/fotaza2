import { Router } from "express";
import { authMiddleware } from "../middlewares/authMiddleware.js";
import { crearPublicacion, detallePublicacion } from "../controllers/publicacionController.js";
import { upload } from "../utils/multer.js";

const router = Router();



//router.get('/', authMiddleware, getPublicaciones);
router.get('/crear', authMiddleware, (req,res)=>{
    res.render('publicaciones/crear');
})

router.post('/', authMiddleware, upload.single('imagen'),crearPublicacion); 

router.get('/:id', detallePublicacion);


export default router;