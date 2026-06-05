import { Fotografia } from "../models/Fotografia.js";
import { Publicacion } from "../models/Publicacion.js";
import { Usuario } from "../models/Usuario.js";
import { Etiqueta } from "../models/Etiqueta.js";
import { validarFotografia } from "../utils/validaciones/fotografiaValidacion.js";
import { validarPublicacion } from "../utils/validaciones/publicacionValidacion.js";
import { Comentario } from "../models/Comentario.js";
import { Valoracion } from "../models/Valoracion.js";
import { where } from "sequelize";

export async function crearPublicacion(req,res){

    try{

        const {
            titulo,
            descripcion,
            licencia
        } = req.body;

        const publicacionValidada =
            validarPublicacion({
                titulo,
                descripcion
            });

        const fotografiaValidada =
            validarFotografia({
                licencia
            });

        if(!publicacionValidada.success){

            return res.render(
                'publicaciones/create',
                {
                    errors:
                    publicacionValidada.errors
                }
            );
        }

        if(!fotografiaValidada.success){

            return res.render(
                'publicaciones/create',
                {
                    errors:
                    fotografiaValidada.errors
                }
            );
        }

        if(!req.file){
            return res.render('publicaciones/create',{error:'Debe seleccionar una imagen'});
        }

        const publicacion =
            await Publicacion.create({

                titulo,
                descripcion,

                usuario_id:
                    req.session.user

            });

        await Fotografia.create({

            imagen:
                req.file.buffer,

            licencia,

            publicacion_id:
                publicacion.id

        });

        res.redirect(`/publicaciones/${publicacion.id}`);
        return 

    }catch(error){

        console.log(error);

        return
        res.redirect('/');
    }
}

export async function detallePublicacion(req,res){
    try {

        let user = null;
        if(req.session.user){
            user = await Usuario.findByPk(req.session.user);
        }

    const publicacion =
        await Publicacion.findByPk(
            parseInt(req.params.id),
            {
                include:[
                    Fotografia,
                    Usuario,
                    Etiqueta
                ]
            }
        );

    if(!publicacion){

        res.redirect('/');
        return 
    }

if(
    !publicacion.Fotografia ||
    publicacion.Fotografia.length === 0
){
    res.redirect('/');
        return
}


const foto = publicacion.Fotografia[0];

const comentarios = await Comentario.findAll({
    where:{
        fotografia_id: foto.id
    },
    include:[Usuario]
});

const valoraciones = await Valoracion.findAll({
    where:{fotografia_id: foto.id}
})

let promedio = 0;

for(const valoracion of valoraciones){
    promedio += valoracion.puntaje;
}
if(valoraciones.length > 0){
    promedio = (promedio / valoraciones.length).toFixed(1);
}



    res.render(
        'publicaciones/detalle',
        {
            user,
            publicacion,
            comentarios,
            promedio: promedio,
            cantidadValoraciones: valoraciones.length
        }
    );
    } catch (error) {
        console.log(error);
    }
    
}