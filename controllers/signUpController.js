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


export const getSignUpForm = async (req,res) =>{
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
        const emailEncontrado = await usuarioPorEmail(email);
        if(!validacion.success){
            res.status(400).render('auth/signup',{error: validacion.errors});
            return;
        }
        if(!emailEncontrado){
            res.status(400).render('auth/signup', {error: 'El email ya se encuentra registrado'});
        }else{
            const usuario = await Usuario.create({nombre,email,password});
            res.status(200).render('auth/login')
        }
    } catch (error) {
        console.log('post: signup',error);
    }

}