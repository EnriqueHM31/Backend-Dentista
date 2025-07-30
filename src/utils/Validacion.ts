import { UUID } from '../types/types';
import { z } from 'zod';
export class Validacion {
    static idsObjetos = z.object({
        id: z.string().min(1, { message: "El id es requerido" }),
    })
    static especialista = z.object({
        nombre: z.string().min(1, { message: "El nombre es requerido" }),
        apellido: z.string().min(1, { message: "El apellido es requerido" }),
        email: z.string(),
        telefono: z.string().min(1, { message: "El teléfono es requerido" }),
        direccion: z.string().min(1, { message: "La dirección es requerida" }),
        avatar: z.string().min(1, { message: "La imagen es requerida" }).startsWith("https://"),
        linkedin: z.string().min(1, { message: "La referencia es requerida" }).startsWith("https://"),
    })

    static user = z.object({
        username: z.string().min(1, { message: "El nombre de usuario es requerido" }),
        password: z.string().min(1, { message: "La contraseña es requerida" }),
    })
}

export function validarId(data: { id: UUID }) {
    return Validacion.idsObjetos.safeParse(data);
}


export function validarEditarUsuario(data: { username: string, password: string }) {
    return Validacion.user.partial().safeParse(data);
}


