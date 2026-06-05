import { Comentario } from "../models/Comentario.js"
import { validarComentario } from "../utils/validaciones/comentarioValidacion.js";

export const crearComentario = async (req,res) => {
    try {
                console.log("BODY:", req.body);
        const {texto, fotografia_id,publicacion_id} = req.body;
        const validacion = validarComentario({texto});
                console.log("VALIDACION:", validacion);
        if(!validacion.success){
            res.redirect(`/publicaciones/${publicacion_id}`);
            return;
        }

        await Comentario.create({
            texto,
            usuario_id: req.session.user,
            fotografia_id
        });
                console.log("COMENTARIO CREADO:", comentario.toJSON());
        res.redirect(`/publicaciones/${publicacion_id}`);
        return;
    } catch (error) {
        console.log(error);
        return res.redirect('/');
    }
}