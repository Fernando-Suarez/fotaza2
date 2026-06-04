import * as z from 'zod';

//ESQUEMA
const Registro = z.object({
            nombre: z.string().max(50),
            email: z.email(),
            password: z.string().min(6),
            confirmPassword: z.string()
}).refine((data) => data.password === data.confirmPassword,{    //refine hace la comprobacion de que el pass y el confirmPass sean iguales
    message:'Las contraseñas no coinciden',
    path:["confirmPassword"]});

export function validarRegistro(registro){
    const result = Registro.safeParse(registro);
if (!result.success) {
    return {success: false ,errors: z.flattenError(result.error).fieldErrors        
    }
} else {
    return {success: true, data: result.data};  
}
}