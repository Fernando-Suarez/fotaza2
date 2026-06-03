import sequelize from "../db/config.js";
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
import { Coleccion } from "./Coleccion.js";
import { ColeccionPublicacion } from "./ColeccionPublicacion.js";
import { Mensaje } from "./Mensaje.js";

// Asosiaciones
/* ==========================
    USUARIO - PUBLICACION
========================== */

Usuario.hasMany(Publicacion, {
    foreignKey: "usuario_id",
});

Publicacion.belongsTo(Usuario, {
    foreignKey: "usuario_id",
});

/* ==========================
    PUBLICACION - FOTOGRAFIA
========================== */

Publicacion.hasMany(Fotografia, {
    foreignKey: "publicacion_id",
});

Fotografia.belongsTo(Publicacion, {
    foreignKey: "publicacion_id",
});

/* ==========================
    PUBLICACION - ETIQUETA
========================== */

Publicacion.belongsToMany(Etiqueta, {
    through: PublicacionEtiqueta,
    foreignKey: "publicacion_id",
});

Etiqueta.belongsToMany(Publicacion, {
    through: PublicacionEtiqueta,
    foreignKey: "etiqueta_id",
});

/* ==========================
    COMENTARIOS
========================== */

Usuario.hasMany(Comentario, {
    foreignKey: "usuario_id",
});

Comentario.belongsTo(Usuario, {
    foreignKey: "usuario_id",
});

Fotografia.hasMany(Comentario, {
    foreignKey: "fotografia_id",
});

Comentario.belongsTo(Fotografia, {
    foreignKey: "fotografia_id",
});

/* ==========================
    VALORACIONES
========================== */

Usuario.hasMany(Valoracion, {
    foreignKey: "usuario_id",
});

Valoracion.belongsTo(Usuario, {
    foreignKey: "usuario_id",
});

Fotografia.hasMany(Valoracion, {
    foreignKey: "fotografia_id",
});

Valoracion.belongsTo(Fotografia, {
    foreignKey: "fotografia_id",
});

/* ==========================
    INTERES
========================== */

Usuario.hasMany(Interes, {
    foreignKey: "usuario_id",
});

Interes.belongsTo(Usuario, {
    foreignKey: "usuario_id",
});

Fotografia.hasMany(Interes, {
    foreignKey: "fotografia_id",
});

Interes.belongsTo(Fotografia, {
    foreignKey: "fotografia_id",
});

/* ==========================
    DENUNCIAS
========================== */

Usuario.hasMany(Denuncia, {
    foreignKey: "usuario_id",
});

Denuncia.belongsTo(Usuario, {
    foreignKey: "usuario_id",
});

Fotografia.hasMany(Denuncia, {
    foreignKey: "fotografia_id",
});

Denuncia.belongsTo(Fotografia, {
    foreignKey: "fotografia_id",
});

Motivo.hasMany(Denuncia, {
    foreignKey: "motivo_id",
});

Denuncia.belongsTo(Motivo, {
    foreignKey: "motivo_id",
});

/* ==========================
    NOTIFICACIONES
========================== */

Usuario.hasMany(Notificacion, {
    foreignKey: "usuario_destino",
});

Notificacion.belongsTo(Usuario, {
    foreignKey: "usuario_destino",
    as: "destinatario",
});

/* ==========================
    SEGUIDORES
========================== */

Usuario.belongsToMany(Usuario, {
    through: Seguidor,
    as: "seguidos",
    foreignKey: "seguidor_id",
    otherKey: "seguido_id",
});

Usuario.belongsToMany(Usuario, {
    through: Seguidor,
    as: "seguidores",
    foreignKey: "seguido_id",
    otherKey: "seguidor_id",
});

/* ==========================
    MENSAJES
========================== */

Usuario.hasMany(Mensaje, {
    foreignKey: "remitente_id",
    as: "mensajesEnviados",
});

Usuario.hasMany(Mensaje, {
    foreignKey: "destinatario_id",
    as: "mensajesRecibidos",
});

Mensaje.belongsTo(Usuario, {
    foreignKey: "remitente_id",
    as: "remitente",
});

Mensaje.belongsTo(Usuario, {
    foreignKey: "destinatario_id",
    as: "destinatario",
});

/* ==========================
    COLECCIONES
========================== */

Usuario.hasMany(Coleccion, {
    foreignKey: "usuario_id",
});

Coleccion.belongsTo(Usuario, {
    foreignKey: "usuario_id",
});

Coleccion.belongsToMany(Publicacion, {
    through: ColeccionPublicacion,
    foreignKey: "coleccion_id",
});

Publicacion.belongsToMany(Coleccion, {
    through: ColeccionPublicacion,
    foreignKey: "publicacion_id",
});

export async function connectDatabase() {
    try {
        await sequelize.authenticate();
        console.log("[+] Conexion a db establecida");
        await sequelize.sync({ alter: true });
        console.log("[+] Sincronizando los modelos");
    } catch (error) {
        console.error("[+] Error en la conexion a la db", error);
        throw error;
    }
}
