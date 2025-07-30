import { z } from 'zod';

export class ValidacionComentarios {

    static comentario = z.object({
        nombre: z.string()
            .min(1, { message: "El nombre es requerido" }),
        ranking: z.number()
            .min(1, { message: "El ranking es requerido" })
            .max(5, { message: "El ranking debe ser entre 1 y 5" }),
        email: z.string(),
        servicio: z.string(),
        mensaje: z.string().min(1, { message: "El comentario es requerido" }),
    })

    static comentarioEditar = z.object({
        visible: z.boolean(),
    })

}

export function validarComentario(data: { nombre: string, ranking: number, email: string, categoria: string, comentario: string }) {
    return ValidacionComentarios.comentario.safeParse(data);
}

export function validarComentarioEditar(data: { visible: boolean }) {
    return ValidacionComentarios.comentarioEditar.safeParse(data);
}