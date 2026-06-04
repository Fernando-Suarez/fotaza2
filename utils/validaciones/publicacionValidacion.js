import * as z from 'zod';

//ESQUEMA
const Publicacion = z.object({
            titulo: z.string(),
            descripcion: z.string().optional()
})

export function validarPublicacion(publicacion){
    const result = Publicacion.safeParse(publicacion);
if (!result.success) {
    return {success: false ,errors: z.flattenError(result.error).fieldErrors        
    }
} else {
    return {success: true, data: result.data};  
}
}