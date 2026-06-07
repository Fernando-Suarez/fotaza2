import { Json } from "sequelize/lib/utils"
import { Fotografia } from "../models/Fotografia.js"
import { Publicacion } from "../models/Publicacion.js"
import { Usuario } from "../models/Usuario.js"

export const getPerfil = async (req,res)=>{
    try {
        const user = await Usuario.findByPk(req.session.user,{
            include:[
                {
                    model: Publicacion,
                    include:[Fotografia]
                }
            ]
        })
        const publicaciones = user.Publicacions;
        res.render('perfil',{
            user,
            usuario:user,
            publicaciones:publicaciones});
    } catch (error) {
        console.log(error);
        res.redirect('/');
    }

}

export const obtenerAvatar = async (req,res)=>{

    const usuario = await Usuario.findByPk(req.params.id);

    if(!usuario || !usuario.avatar){
        return res.status(404).send('Sin avatar');
    }

    res.contentType('image/jpeg');
    res.send(usuario.avatar);
}

export const actualizarAvatar = async (req,res)=>{
    try {

        await Usuario.update(
            {
                avatar: req.file.buffer
            },
            {
                where:{
                    id:req.session.user
                }
            }
        );

        res.redirect('/perfil');

    } catch (error) {
        console.log(error);
        res.redirect('/perfil');
    }
}
