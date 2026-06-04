//IMPORTS
import 'dotenv/config';
import express from 'express';
import sequelize from './db/config.js';
import { connectDatabase } from './models/index.js';
import authRouter from './routes/authRouter.js';
import session from 'express-session';


//VARIABLES
const PORT = process.env.PORT || 3000;
const app = express();



//MIDDLEWARES
app.use(express.static('public'));
app.use(session({
    secret: process.env.SESSION_KEY,
    cookie:{
        httpOnly:false,
        secure: false, // cuando se hace el deploy se cambia
        maxAge: 24 * 60 * 60 * 1000, // 24 hs
        sameSite: 'lax',
    },
    resave: false,
    saveUninitialized: false
}))
app.use(express.json());
app.use(express.urlencoded({extended:true}));

//  MOTOR DE PLANTILLAS
app.set('view engine', 'pug');
app.set('views', './views');


//ROUTES

app.get('/', (req,res)=>{
    res.render('home');
})
app.use('/auth', authRouter);

app.get('/perfil', (req,res) =>{
    res.status(200).render('perfil',{usuario:{},publicaciones:[],cantidadSeguidores:2,cantidadSeguidos:1});
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

