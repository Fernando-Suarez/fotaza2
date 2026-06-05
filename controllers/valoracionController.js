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
        console.log('VALIDACION : ' + JSON.stringify(validacion));
        if(!validacion.succes){
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
            existeValoracion.update({puntaje: parseInt(puntaje)});
                res.redirect(`/publicaciones/${publicacion_id}`);
                return;
        }else{
            await Valoracion.create({
                puntaje,
                usuario_id: user.id,
                fotografia_id})
        }
            res.redirect(`/publicaciones/${publicacion_id}`);
    } catch (error) {
        console.log(error);
        res.redirect('/');
    }

}