//IMPORTS
import 'dotenv/config';
import express from 'express';
import sequelize from './db/config.js';
import { connectDatabase } from './models/index.js';
import authRouter from './routes/authRouter.js';
import publicacionesRouter from './routes/publicacionesRouter.js';
import fotografiaRouter from './routes/fotografiasRouter.js';
import comentariosRouter from './routes/comentarioRouter.js';
import valoracionesRouter from './routes/valoracionRouter.js';
import perfilRouter from './routes/perfilRouter.js';
import seguidorRouter from './routes/seguidorRouter.js'
import notificacionRouter from './routes/notificacionRouter.js';
import session from 'express-session';
import { authMiddleware } from './middlewares/authMiddleware.js';
import { Usuario } from './models/Usuario.js';
import { getHome } from './controllers/homeController.js';


//VARIABLES
const PORT = process.env.PORT || 3000;
const app = express();



//MIDDLEWARES
app.use(express.static('public'));
app.set('trust proxy', 1);
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

app.get('/',getHome);
app.use('/auth', authRouter);
app.use('/publicaciones', publicacionesRouter);
app.use('/fotografias', fotografiaRouter);
app.use('/comentarios', comentariosRouter);
app.use('/valoraciones', valoracionesRouter);
app.use('/perfil', perfilRouter);
app.use('/seguir', seguidorRouter);
app.use('/notificaciones', notificacionRouter);

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

