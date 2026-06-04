import { Router } from "express";
const router = Router();






router.get('/crear', (req,res)=>{
    res.render('publicaciones/crear');
})

router.post('/crear', (req,res)=>{
    
})

router.get('/:id', (req,res)=>{
    res.render('publicaciones/detalle');
})
