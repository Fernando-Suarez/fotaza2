import { Publicacion } from '../models/Publicacion.js';
import { Fotografia } from '../models/Fotografia.js';


export async function obtenerFotografia(req, res) {

    try {

        const fotografia = await Fotografia.findByPk(
            req.params.id
        );

        if (!fotografia) {
            return res.sendStatus(404);
        }

        res.set('Content-Type', 'image/jpeg');

        return res.send(fotografia.imagen);

    } catch (error) {

        console.log(error);

        return res.sendStatus(500);
    }
}





