import { Op } from "sequelize";
import sharp from 'sharp';
import { Fotografia } from "../models/Fotografia.js";
import { Publicacion } from "../models/Publicacion.js";
import { Usuario } from "../models/Usuario.js";
import { Etiqueta } from "../models/Etiqueta.js";
import { validarFotografia } from "../utils/validaciones/fotografiaValidacion.js";
import { validarPublicacion } from "../utils/validaciones/publicacionValidacion.js";
import { Comentario } from "../models/Comentario.js";
import { Valoracion } from "../models/Valoracion.js";


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
                usuario_id:req.session.user

            });

        const usuario = await Usuario.findByPk(req.session.user);    
        let imagen = req.file.buffer;
        let marcaAgua = false;

        if(licencia === 'COPYRIGHT'){
            marcaAgua = true;
            imagen = await sharp(req.file.buffer,{
                limitInputPixels:false
            })
                .resize({
                    width: 1200,
                    height: 1200,
                    fit: 'inside',
                    withoutEnlargement: true
                })
                .composite([
                    {
                        input: Buffer.from(`
                            <svg width="150" height="40">
                                <style>
                                    .title {
                                        fill: white;
                                        fill-opacity: 0.5;
                                        font-size: 16px;
                                        font-family: Arial, sans-serif;
                                    }
                                </style>

                                <text x="10" y="25" class="title">
                                    © ${usuario.nombre}
                                </text>
                            </svg>
                            `),
                            gravity: 'southeast'
                        }
                    ])  
                .jpeg({ quality: 80 })
                .toBuffer();}

        await Fotografia.create({

            imagen,

            licencia,

            publicacion_id:publicacion.id,

            marca_agua: marcaAgua,

            texto_marca_agua: usuario.nombre
        });

        const etiquetasTexto = req.body.etiquetas;

if(etiquetasTexto){

    const etiquetas = etiquetasTexto
        .split(',')
        .map(e => e.trim())
        .filter(e => e.length > 0);

    for(const titulo of etiquetas){

        const [etiqueta] =
            await Etiqueta.findOrCreate({
                where:{ titulo }
            });

        await publicacion.addEtiqueta(etiqueta);
    }
}

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


export const buscarPublicaciones = async (req,res)=>{

    try {

        const {etiqueta,titulo,usuario} = req.query;

        const wherePublicacion = {};
        const whereUsuario = {};
        const whereEtiqueta = {};

        if(titulo){
            wherePublicacion.titulo = {
                [Op.iLike]: `%${titulo}%`
            };
        }

        if(usuario){
            whereUsuario.nombre = {
                [Op.iLike]: `%${usuario}%`
            };
        }

        if(etiqueta){
            whereEtiqueta.titulo = {
                [Op.iLike]: `%${etiqueta}%`
            };
        }

        const publicaciones = await Publicacion.findAll({
        where: wherePublicacion,
        
        include:[
            {
                model:Usuario,
                where: whereUsuario,
                required:false
            },    
            {    
                model: Etiqueta,
                where: whereEtiqueta,
                required:false
            },
            {    model:Fotografia
            }
        ]
    });
        res.render('home', {
            publicaciones,
            filtros: req.query
        });
    } catch (error) {
        console.log(error);
        res.redirect('/');
    }
    

}