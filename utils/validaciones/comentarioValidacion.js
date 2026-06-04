import * as z from 'zod';

const Comentario = z.object({
    texto: z.string()
})


export function validarComentario(comentario){
    const result = Comentario.safeParse(comentario);
    if(!result.success){
        return {success: false, errors: z.flattenError(result.error).fieldErrors}
    }else{
        return {success: true, data: result.data};
    }
}