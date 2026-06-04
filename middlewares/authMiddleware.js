import { Usuario } from "../models/Usuario.js";

export async function authMiddleware(req,res,next){
    const userId = req.session.user;
    if(!userId){
        res.redirect('/auth/login');
        return;
    }
    try {
        const user = await Usuario.findByPk(userId,{
            attributes: ['id','nombre','email','rol','avatar']
        });
        if(!user){
            req.session.destroy(()=>{});
            res.redirect('/auth/login');
            return;
        }
        res.locals.user = {
            id: user.id,
            nombre: user.nombre,
            rol: user.rol,
            avatar: user.avatar,
        };
        next();
    } catch (error) {
        console.log(error);
        return res.redirect('/auth/login');
    }

}


export function autenticadoMiddleware(req,res,next){

    if(req.session.user){
        return res.redirect('/');
    }

    next();
}