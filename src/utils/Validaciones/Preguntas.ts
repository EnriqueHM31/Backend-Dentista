import { z } from 'zod';

export class ValidacionPreguntas {

    static pregunta = z.object({
        pregunta: z.string().min(1, { message: "La pregunta es requerida" }),
        respuesta: z.string().min(1, { message: "La respuesta es requerida" }),
    })

}

export function validarPregunta(data: { pregunta: string, respuesta: string }) {
    return ValidacionPreguntas.pregunta.safeParse(data);
}

export function validarEditarPregunta(data: { pregunta: string, respuesta: string }) {
    return ValidacionPreguntas.pregunta.partial().safeParse(data);
}
