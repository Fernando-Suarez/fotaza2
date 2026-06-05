import { Publicacion } from '../models/Publicacion.js';
import { Fotografia } from '../models/Fotografia.js';
import { Usuario } from '../models/Usuario.js';


export const getHome = async (req,res)=>{

    let user = null;

    if(req.session.user){
        user = await Usuario.findByPk(req.session.user);
    }

    const publicaciones = await Publicacion.findAll({

        include:[Fotografia,
            Usuario,
        ],

        order:[
            ['createdAt','DESC']
        ]
    });
    res.render('home', {
        user,
        publicaciones
    });
};