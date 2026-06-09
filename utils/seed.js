
import sequelize from "../db/config.js";
import '../models/index.js';
import { Usuario } from "../models/Usuario.js";
import { Etiqueta } from "../models/Etiqueta.js";
import { Motivo } from "../models/Motivo.js";

async function seed() {
try {

    console.log("Inicializando base de datos...");

    await sequelize.sync({ force: true });

    console.log("Base de datos creada.");

    //Usuarios

    await Usuario.bulkCreate([
        {
            nombre: "Fernando",
            email: "fernando@test.com",
            password: "123456",
            rol: "CLIENTE",
            activo: true
        },
        {
            nombre: "Administrador",
            email: "admin@test.com",
            password: "123456",
            rol: "ADMIN",
            activo: true
        }
    ]);

    console.log("Usuarios creados.");

    //Etiquetas

    await Etiqueta.bulkCreate([
        { titulo: "Paisaje" },
        { titulo: "Naturaleza" },
        { titulo: "Ciudad" },
        { titulo: "Arte" },
        { titulo: "Animales" },
        { titulo: "Viajes" }
    ]);

    console.log("Etiquetas creadas.");

 //Motivos Denuncia

    await Motivo.bulkCreate([
        { nombre: "Spam" },
        { nombre: "Contenido ofensivo" },
        { nombre: "Copyright" }
    ]);

    console.log("Motivos creados.");

    console.log("Seed completado correctamente.");

    process.exit(0);

} catch (error) {

    console.error("Error ejecutando seed:", error);
    process.exit(1);
}


}

seed();
