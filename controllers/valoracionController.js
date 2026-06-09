import { Fotografia } from "../models/Fotografia.js";
import { Notificacion } from "../models/Notificacion.js";
import { Publicacion } from "../models/Publicacion.js";
import { Usuario } from "../models/Usuario.js";
import { Valoracion } from "../models/Valoracion.js"
import { validarValoracion } from "../utils/validaciones/valoracionValidacion.js";



export const crearValoracion = async (req,res) => {
    try {
        let user = null;
        if(req.session.user){
            user = await Usuario.findByPk(req.session.user);
        }
        const {fotografia_id,publicacion_id,puntaje} = req.body;
        const validacion = validarValoracion({puntaje: parseInt(puntaje)});

        if(!validacion.success){
            res.redirect('/');
            return;
        }


        const existeValoracion = await Valoracion.findOne(
            {where:
                {
                    usuario_id: req.session.user,
                    fotografia_id
                }})
        if(existeValoracion){
            await existeValoracion.update({puntaje: parseInt(puntaje)});
                res.redirect(`/publicaciones/${publicacion_id}`);
                return;
        }else{

            await Valoracion.create({
                puntaje: parseInt(puntaje),
                usuario_id: user.id,
                fotografia_id})

            const foto = await Fotografia.findByPk(fotografia_id,{
                include:[Publicacion]
            })
                if(!foto){
                    res.redirect('/');
                    return;
                }
                
                if(foto.Publicacion.usuario_id !== req.session.user){
                    await Notificacion.create({
                        tipo: 'VALORACION',
                        usuario_destino: foto.Publicacion.usuario_id ,
                        usuario_origen: req.session.user,
                        fotografia_id: fotografia_id ,
                        leida: false
                    });        
                }
        }
        
            res.redirect(`/publicaciones/${publicacion_id}`);
    } catch (error) {
        console.log(error);
        res.redirect('/');
    }

}