import { z } from 'zod';

export class ValidacionSociales {

    static sociales = z.object({
        nombre: z.string().min(1, { message: "El nombre es requerido" }),
        referencia: z.string().min(1, { message: "La referencia es requerida" }),
    })

    static socialesEditar = z.object({
        referencia: z.string().min(1, { message: "La referencia es requerida" }),
    })
}

export function validarSocial(data: { nombre: string, referencia: string }) {
    return ValidacionSociales.sociales.safeParse(data);
}

export function validarSocialEditar(data: { referencia: string }) {
    return ValidacionSociales.socialesEditar.safeParse(data);
}