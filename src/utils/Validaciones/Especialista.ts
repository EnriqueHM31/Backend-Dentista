import { EspecialistaCrearProps, EspecialistaProps } from '../../types/especialista';
import { z } from 'zod';

export class ValidacionEspecialista {

    static especialista = z.object({
        nombre: z.string().min(1, { message: "El nombre es requerido" }),
        apellido: z.string().min(1, { message: "El apellido es requerido" }),
        email: z.string().min(1, { message: "El email es requerido" }).includes('@', { message: "El email no es valido" }),
        telefono: z.string().min(1, { message: "El teléfono es requerido" }),
        direccion: z.string().min(1, { message: "La dirección es requerida" }),
        avatar: z.string().min(1, { message: "La imagen es requerida" }).startsWith("https://"),
        linkedin: z.string().min(1, { message: "La referencia es requerida" }).startsWith("https://"),
        servicio: z.string().min(1, { message: "El servicio es requerido" }),
    })

}

export function validarEspecialista(data: EspecialistaProps) {
    return ValidacionEspecialista.especialista.safeParse(data);
}

export function validarEspecialistaEditar(data: EspecialistaCrearProps) {
    return ValidacionEspecialista.especialista.partial().safeParse(data);
}