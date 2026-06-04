import * as z from 'zod';

//ESQUEMA
const Registro = z.object({
            nombre: z.string().max(50),
            email: z.email(),
            password: z.string().min(6),
})

export function validarRegistro(registro){
    const result = Registro.safeParse(registro);
if (!result.success) {
    return {success: false ,errors: z.flattenError(result.error).fieldErrors        
    }
} else {
    return {success: true, data: result.data};  
}
}