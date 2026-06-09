import { Comentario } from "../models/Comentario.js";
import { Notificacion } from "../models/Notificacion.js";
import { Usuario } from "../models/Usuario.js";
import { Valoracion } from "../models/Valoracion.js";

export const listarNotificaciones = async (req,res)=>{

    try {

        await Notificacion.update(
            {
                leida:true
            },
            {
                where:{
                    usuario_destino:req.session.user,
                    leida:false
                }
            }
        );

        const notificaciones = await Notificacion.findAll({
            where:{
                usuario_destino:req.session.user
            },
            include:[
                {
                    model: Usuario,
                    as:'origen'
                }
            ],
            order:[
                ['createdAt','DESC']
            ]
        });

        res.render(
            'notificaciones',
            {notificaciones}
        );

    } catch (error) {

        console.log(error);
        res.redirect('/');
    }
}