import {Usuario} from '../models/Usuario.js'
import { validarRegistro } from '../utils/validaciones/registroValidacion.js';


// funcion que va en usuario
export async function usuarioPorEmail(email){
    const usuario = await Usuario.findOne({
        where:{
            email: email
        }
        
    })
    return usuario;
}


export const getSignUpForm = (req,res) =>{
    try { 
        res.status(200).render('auth/signup');
    } catch (error) {
        console.log('get: signup', error);
    }
}


export const signUp = async (req,res)=>{
    try {
        const {nombre,email,password,confirmPassword} = req.body;
        const validacion = validarRegistro({nombre,email,password,confirmPassword});
        if(!validacion.success){
            res.status(400).render('auth/signup',{error: validacion.errors.confirmPassword});
            return
        }
        const usuarioEncontrado = await usuarioPorEmail(email);
        if(usuarioEncontrado){
            res.status(400).render('auth/signup', {error: 'El email ya se encuentra registrado'});
            return
        }
        const usuario = await Usuario.create({nombre,email,password});
        req.session.user = usuario.id;
        res.redirect('/');
        return;
        
    } catch (error) {
        console.log('post: signup',error);
        res.redirect('/auth/signup');
    }

}