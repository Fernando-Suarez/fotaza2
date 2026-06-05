import { Fotografia } from "../models/Fotografia.js";
import { Publicacion } from "../models/Publicacion.js";
import { Usuario } from "../models/Usuario.js";
import { Etiqueta } from "../models/Etiqueta.js";
import { validarFotografia } from "../utils/validaciones/fotografiaValidacion.js";
import { validarPublicacion } from "../utils/validaciones/publicacionValidacion.js";

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

            return res.render(
                'publicaciones/create',
                {
                    error:
                    'Debe seleccionar una imagen'
                }
            );
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

        return res.redirect(
            `/publicaciones/${publicacion.id}` 
        );

    }catch(error){

        console.log(error);

        return res.redirect('/');
    }
}

export async function detallePublicacion(req,res){
    let user = null;
        if(req.session.user){
            user = await Usuario.findByPk(req.session.user);
        }

    const publicacion =
        await Publicacion.findByPk(
            req.params.id,
            {
                include:[
                    Fotografia,
                    Usuario,
                ]
            }
        );

    if(!publicacion){

        return res.redirect('/');
    }

    res.render(
        'publicaciones/detalle',
        {
            user,
            publicacion,
            comentarios:[]
        }
    );
}