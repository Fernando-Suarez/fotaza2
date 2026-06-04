import * as z from 'zod';

//ESQUEMA
const Fotografia = z.object({
            licencia: z.enum(["COPYRIGHT","SIN_COPYRIGHT"]),
})

export function validarFotografia(licencia){
    const result = Fotografia.safeParse(licencia);
if (!result.success) {
    return {success: false ,errors: z.flattenError(result.error).fieldErrors        
    }
} else {
    return {success: true, data: result.data};  
}
}