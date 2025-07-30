import { z } from 'zod';
import { CitaCrearProps } from '../../types/citas';

export class ValidacionCitas {
    static citas = z.object({
        nombre: z.string().min(1, { message: "El nombre es requerido" }),
        email: z.string().includes('@').min(1, { message: "El email es requerido" }),
        comentarios: z.string().min(1, { message: "El mensaje es requerido" }),
        telefono: z.string().min(1, { message: "El teléfono es requerido" }),
        servicio: z.string(),
        fecha: z.iso.date(),
        hora: z.iso.time(),
    })

    static citasEditar = z.object({
        completado: z.boolean(),
    })
}

export function validarCita(data: CitaCrearProps) {
    return ValidacionCitas.citas.safeParse(data);
}

export function validarCitaEditar(data: { completado: boolean }) {
    return ValidacionCitas.citasEditar.safeParse(data);
}