//IMPORTS
import 'dotenv/config';
import express from 'express';
import sequelize from './db/config.js';
import { connectDatabase } from './models/index.js';


//VARIABLES
const PORT = process.env.PORT || 3000;
const app = express();



//MIDDLEWARES
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static('public'));


//  MOTOR DE PLANTILLAS
app.set('view engine', 'pug');
app.set('views', './views');


//ROUTES

app.get('/', (req,res)=>{
    res.render('home');
})

app.get('/signup', (req,res) => {
    res.render('auth/signup');
})

app.get('/login', (req,res) => {
    res.render('auth/login.pug')
}) 
app.get('/publicaciones/crear', (req,res)=>{
    res.render('publicaciones/crear');
})

app.get('/publicaciones/:id', (req,res)=>{
    res.render('publicaciones/detalle');
})

//CONEXION DB
    try {
        await connectDatabase();
        //LEVANTAR EL SERVIDOR
app.listen(PORT, (error)=>{
    if(error){
        console.log('[-] No se pudo conectar al servidor',error);
        return;
    }
    console.log('[+] Servidor escuchado en el puerto: ' + PORT);
})
    } catch (error) {
        console.error('[-] Error sincronizacion con db');
    }

