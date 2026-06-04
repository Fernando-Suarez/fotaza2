import * as z from 'zod';

const Mensaje = z.object({
    mensaje: z.string().nonempty(),
})


export function validarMensaje(mensaje){
    const result = Mensaje.safeParse(mensaje);
    if(!result.success){
        return {success: false, errors: z.flattenError(result.error).fieldErrors};
    }else{
        return {succes: true, data: result.data};
    }
}