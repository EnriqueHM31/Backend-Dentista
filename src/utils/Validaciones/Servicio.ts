import { z } from 'zod';

export class ValidacionServicio {

    static servicio = z.object({
        titulo: z.string().min(1, { message: "El titulo es requerido" }),
        descripcion: z.string().min(1, { message: "La descripción es requerida" }),
        img: z.string().min(1, { message: "La imagen es requerida" }).startsWith("https://"),
        duration: z.number().min(1, { message: "La duración es requerida" }).int({ message: "La duración debe ser un número entero" }),
    })

}

export function validarServicio(data: { nombre: string, descripcion: string, imagen: string }) {
    return ValidacionServicio.servicio.safeParse(data);
}

export function validarEditarServicio(data: { nombre: string, descripcion: string, imagen: string }) {
    return ValidacionServicio.servicio.partial().safeParse(data);
}