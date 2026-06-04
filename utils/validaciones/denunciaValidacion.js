import * as z from 'zod';

const Denuncia = z.object({
    motivo_id: z.number(),
    descripcion: z.string().nonempty(),

})


export function validarDenuncia(denuncia){
    const result = Denuncia.safeParse(denuncia);
    if(!result.success){
        return {success: false, errors: z.flattenError(result.error).fieldErrors};
    }else{
        return {succes: true, data: result.data};
    }
}