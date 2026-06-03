import sequelize from "../db/config.js";
import { Usuario } from "../models/Usuario.js";
import { Publicacion } from "../models/Publicacion.js";
import { Fotografia } from "../models/Fotografia.js";
import { Etiqueta } from "../models/Etiqueta.js";
import { PublicacionEtiqueta } from "../models/PublicacionEtiqueta.js";
import { Comentario } from "../models/Comentario.js";
import { Valoracion } from "../models/Valoracion.js";
import { Seguidor } from "../models/Seguidor.js";
import { Denuncia } from "../models/Denuncia.js";
import { Motivo } from "../models/Motivo.js";
import { Notificacion } from "../models/Notificacion.js";
import { Interes } from "../models/Interes.js";
import { Coleccion } from "../models/Coleccion.js";
import { ColeccionPublicacion } from "../models/ColeccionPublicacion.js";
import { Mensaje } from "../models/Mensaje.js";

async function seed() {

    await sequelize.sync({ alter: true });

    console.log("Iniciando seed...");

    // =====================
    // USUARIOS
    // =====================

    const usuarios = await Usuario.bulkCreate([
        {
            nombre: "Fernando",
            email: "fernando@test.com",
            password: "123456",
            rol: "CLIENTE",
            activo: true
        },
        {
            nombre: "Juan",
            email: "juan@test.com",
            password: "123456",
            rol: "CLIENTE",
            activo: true
        },
        {
            nombre: "Admin",
            email: "admin@test.com",
            password: "123456",
            rol: "ADMIN",
            activo: true
        }
    ], { returning: true });

    // =====================
    // ETIQUETAS
    // =====================

    const etiquetas = await Etiqueta.bulkCreate([
        { titulo: "Paisaje" },
        { titulo: "Naturaleza" },
        { titulo: "Ciudad" },
        { titulo: "Arte" }
    ], { returning: true });

    // =====================
    // MOTIVOS
    // =====================

    const motivos = await Motivo.bulkCreate([
        { nombre: "Spam" },
        { nombre: "Contenido ofensivo" },
        { nombre: "Copyright" }
    ], { returning: true });

    // =====================
    // PUBLICACIONES
    // =====================

    const publicaciones = await Publicacion.bulkCreate([
        {
            titulo: "Atardecer en Villa Mercedes",
            descripcion: "Foto tomada desde la costanera",
            usuario_id: usuarios[0].id
        },
        {
            titulo: "Montañas de Córdoba",
            descripcion: "Viaje de vacaciones",
            usuario_id: usuarios[1].id
        }
    ], { returning: true });

    // =====================
    // FOTOGRAFIAS
    // =====================

    const fotos = await Fotografia.bulkCreate([
        {
            imagen: "https://picsum.photos/id/10/800/500",
            licencia: "SIN_COPYRIGHT",
            marca_agua: false,
            comentarios_habilitados: true,
            publicacion_id: publicaciones[0].id
        },
        {
            imagen: "https://picsum.photos/id/20/800/500",
            licencia: "COPYRIGHT",
            marca_agua: true,
            texto_marca_agua: "Fernando",
            comentarios_habilitados: true,
            publicacion_id: publicaciones[1].id
        }
    ], { returning: true });

    // =====================
    // PUBLICACION ETIQUETA
    // =====================

    await PublicacionEtiqueta.bulkCreate([
        {
            publicacion_id: publicaciones[0].id,
            etiqueta_id: etiquetas[0].id
        },
        {
            publicacion_id: publicaciones[0].id,
            etiqueta_id: etiquetas[1].id
        },
        {
            publicacion_id: publicaciones[1].id,
            etiqueta_id: etiquetas[2].id
        }
    ]);

    // =====================
    // COMENTARIOS
    // =====================

    await Comentario.bulkCreate([
        {
            texto: "Excelente fotografía",
            usuario_id: usuarios[1].id,
            fotografia_id: fotos[0].id
        },
        {
            texto: "Muy buena toma",
            usuario_id: usuarios[0].id,
            fotografia_id: fotos[1].id
        }
    ]);

    // =====================
    // VALORACIONES
    // =====================

    await Valoracion.bulkCreate([
        {
            puntaje: 5,
            usuario_id: usuarios[1].id,
            fotografia_id: fotos[0].id
        },
        {
            puntaje: 4,
            usuario_id: usuarios[0].id,
            fotografia_id: fotos[1].id
        }
    ]);

    // =====================
    // INTERESADOS
    // =====================

    await Interes.bulkCreate([
        {
            usuario_id: usuarios[1].id,
            fotografia_id: fotos[0].id
        }
    ]);

    // =====================
    // SEGUIDORES
    // =====================

    await Seguidor.bulkCreate([
        {
            seguidor_id: usuarios[0].id,
            seguido_id: usuarios[1].id
        }
    ]);

    // =====================
    // COLECCIONES
    // =====================

    const colecciones = await Coleccion.bulkCreate([
        {
            nombre: "Mis paisajes",
            usuario_id: usuarios[0].id
        }
    ], { returning: true });

    // =====================
    // COLECCION PUBLICACION
    // =====================

    await ColeccionPublicacion.bulkCreate([
        {
            coleccion_id: colecciones[0].id,
            publicacion_id: publicaciones[0].id
        }
    ]);

    // =====================
    // MENSAJES
    // =====================

    await Mensaje.bulkCreate([
        {
            mensaje: "Hola, me interesa comprar tu foto",
            remitente_id: usuarios[1].id,
            destinatario_id: usuarios[0].id,
            leido: false
        }
    ]);

    // =====================
    // NOTIFICACIONES
    // =====================

    await Notificacion.bulkCreate([
        {
            tipo: "COMENTARIO",
            usuario_destino: usuarios[0].id,
            usuario_origen: usuarios[1].id,
            fotografia_id: fotos[0].id,
            leida: false
        }
    ]);

    // =====================
    // DENUNCIAS
    // =====================

    await Denuncia.bulkCreate([
        {
            descripcion: "Posible copyright",
            usuario_id: usuarios[1].id,
            fotografia_id: fotos[0].id,
            motivo_id: motivos[2].id
        }
    ]);

    console.log("Seed completado.");
}
seed();