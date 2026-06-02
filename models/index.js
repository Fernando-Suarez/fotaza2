import sequelize from "../db/config.js"
import { Usuario } from "./Usuario.js";
import { Publicacion } from "./Publicacion.js";
import { Fotografia } from "./Fotografia.js";
import { Etiqueta } from "./Etiqueta.js";
import { PublicacionEtiqueta } from "./PublicacionEtiqueta.js";
import { Comentario } from "./Comentario.js";
import { Valoracion } from "./Valoracion.js";
import { Seguidor } from "./Seguidor.js";
import { Denuncia } from "./Denuncia.js";
import { Motivo } from "./Motivo.js";
import { Notificacion } from "./Notificacion.js";
import { Interes } from "./Interes.js";





export async function connectDatabase(){
    try {
        await sequelize.authenticate();
        console.log('[+] Conexion a db establecida')
        await sequelize.sync({alter:true});
        console.log('[+] Sincronizando los modelos')
    } catch (error) {
        console.error('[+] Error en la conexion a la db', error)
        throw error
    }
}