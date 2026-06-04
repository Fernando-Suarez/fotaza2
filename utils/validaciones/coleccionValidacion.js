import * as z from 'zod';

const Coleccion = z.object({
    nombre: z.string(),
})


export function validarColeccion(nombreColeccion){
    const result = Coleccion.safeParse(nombreColeccion);
    if(!result.success){
        return {success: false, errors: z.flattenError(result.error).fieldErrors};
    }else{
        return {succes: true, data: result.data};
    }
}