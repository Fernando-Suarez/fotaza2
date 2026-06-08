import { Fotografia } from "../models/Fotografia.js"
import { Publicacion } from "../models/Publicacion.js"
import { Usuario } from "../models/Usuario.js"
import { Seguidor } from "../models/Seguidor.js"


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
        const cantidadSeguidores = await Seguidor.count({
    where:{
        seguido_id: user.id
    }
});

const cantidadSeguidos = await Seguidor.count({
    where:{
        seguidor_id: user.id
    }
});

        res.render('perfil',{
            user,
            usuario:user,
            publicaciones:publicaciones,
            cantidadSeguidores,
            cantidadSeguidos
        });
    } catch (error) {
        console.log(error);
        res.redirect('/');
    }

}


export const verPerfilUsuario = async (req,res)=>{
    try {
        const usuarioSeguido = await Usuario.findByPk(req.params.id,{
        include:[
            {
                model: Publicacion,
                include:[Fotografia]
            }
        ]
    });

    if(!usuarioSeguido){
        return res.redirect('/');
    }

    const cantidadSeguidores = await Seguidor.count({
        where:{
            seguido_id: usuarioSeguido.id
        }
    });

    const cantidadSeguidos = await Seguidor.count({
        where:{
            seguidor_id: usuarioSeguido.id
        }
    });

    let siguiendo = false;

if(req.session.user){

    const relacion = await Seguidor.findOne({
        where:{
            seguidor_id:req.session.user,
            seguido_id:usuarioSeguido.id
        }
    });

    siguiendo = !!relacion;
}

    let user = null;

    if(req.session.user){
        user = await Usuario.findByPk(req.session.user);
    }

    res.render('perfil',{
        user,
        usuario: usuarioSeguido,
        publicaciones: usuarioSeguido.Publicacions,
        cantidadSeguidores,
        cantidadSeguidos,
        siguiendo
    });
    } catch (error) {
        console.log(error)
        res.redirect('/')
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

