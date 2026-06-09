import * as z from 'zod';

const Valoracion = z.object({
    puntaje: z.number().max(5).min(1),
})


export function validarValoracion(valoracion){
    const result = Valoracion.safeParse(valoracion);
    if(!result.success){
        return {success: false, errors: z.flattenError(result.error).fieldErrors};
    }else{
        return {success: true, data: result.data};
    }
}