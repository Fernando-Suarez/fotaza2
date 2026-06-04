import * as z from 'zod';

//ESQUEMA
const Login = z.object({
            email: z.email(),
            password: z.string().min(6),
})

export function validarLogin(login){
    const result = Login.safeParse(login);
if (!result.success) {
    return {success: false ,errors: z.flattenError(result.error).fieldErrors        
    }
} else {
    return {success: true, data: result.data};  
}
}