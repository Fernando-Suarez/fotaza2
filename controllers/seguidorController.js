import { Fotografia } from "../models/Fotografia.js";
import { Notificacion } from "../models/Notificacion.js";
import { Publicacion } from "../models/Publicacion.js";
import { Seguidor } from "../models/Seguidor.js";
import { Usuario } from "../models/Usuario.js";


export const seguirUsuario = async (req,res)=>{
    try {

        const seguido_id = req.params.id;
        const seguidor_id = req.session.user;

        if(seguido_id == seguidor_id){
            return res.redirect(`/perfil/${seguido_id}`);
        }

        const existe = await Seguidor.findOne({
            where:{
                seguido_id,
                seguidor_id
            }
        });

        if(!existe){
            await Seguidor.create({
                seguido_id,
                seguidor_id
            });

            await Notificacion.create({
                tipo: 'SEGUIDOR',
                usuario_destino: seguido_id ,
                usuario_origen: seguidor_id,
                fotografia_id: null ,
                leida: false
        })
        }


        res.redirect(`/perfil/${seguido_id}`);

    } catch (error) {
        console.log(error);
        res.redirect('/');
    }
}




export const dejarDeSeguir = async (req,res)=>{
    try {

        await Seguidor.destroy({
            where:{
                seguido_id:req.params.id,
                seguidor_id:req.session.user
            }
        });

        res.redirect(`/perfil/${req.params.id}`);

    } catch (error) {
        console.log(error);
        res.redirect('/');
    }
}
