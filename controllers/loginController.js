import { validarLogin } from '../utils/validaciones/loginValidacion.js';
import { usuarioPorEmail } from './signUpController.js';

export const getLoginForm = (req,res) => {
    try {
        res.render('auth/login')
    } catch (error) {
        console.log('get: login',error);
        
    }
}


export const login = async (req,res)=>{
    try {
        const {email,password} = req.body;
        const validacion = validarLogin({email,password});
        if(!validacion.success){
            res.status(400).render('auth/login', {formValues: {email: email}});
            return;
        }
        const usuarioEncontrado = await usuarioPorEmail(email);
        if(!usuarioEncontrado){
            res.status(400).render('auth/login', {formValues: {email: email}});
            return;
        }
        const passValidado = await usuarioEncontrado.validatePass(password);
        if(!passValidado){
            res.status(400).render('auth/login', {formValues: {email: email}});
            return;
        }

            req.session.user = usuarioEncontrado.id;
            return res.redirect('/');
            //res.status(200).render('home',{user:usuarioEncontrado});
        
    } catch (error) {
        console.log('post: login',error);
        return res.redirect('/auth/login');
        
    }
}

export const logout = (req,res)=>{

    req.session.destroy(()=>{

        res.redirect('/auth/login');
    });
}