import { Comentario } from "../models/Comentario.js"
import { Fotografia } from "../models/Fotografia.js";
import { Notificacion } from "../models/Notificacion.js";
import { Publicacion } from "../models/Publicacion.js";
import { validarComentario } from "../utils/validaciones/comentarioValidacion.js";


export const crearComentario = async (req,res) => {
    try {

        const {texto, fotografia_id,publicacion_id} = req.body;
        const validacion = validarComentario({texto});

        if(!validacion.success){
            res.redirect(`/publicaciones/${publicacion_id}`);
            return;
        }

        await Comentario.create({
            texto,
            usuario_id: req.session.user,
            fotografia_id
        });

        const foto = await Fotografia.findByPk(fotografia_id,{
            include:[Publicacion]
            
        })
            if(!foto){
                res.redirect('/');
                return;
            }

        if(foto.Publicacion.usuario_id !== req.session.user){
            await Notificacion.create({
                tipo: 'COMENTARIO',
                usuario_destino: foto.Publicacion.usuario_id ,
                usuario_origen: req.session.user,
                fotografia_id: fotografia_id ,
                leida: false
            });        
        }

        res.redirect(`/publicaciones/${publicacion_id}`);
        return;
    } catch (error) {
        console.log(error);
        return res.redirect('/');
    }
}