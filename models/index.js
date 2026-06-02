import sequelize from "../db/config.js"
import { Usuario } from "./Usuario.js";
import { Publicacion } from "./Publicacion.js";
import { Fotografia } from "./Fotografia.js";





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