"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ValidacionPreguntas = void 0;
exports.validarPregunta = validarPregunta;
exports.validarEditarPregunta = validarEditarPregunta;
const zod_1 = require("zod");
class ValidacionPreguntas {
}
exports.ValidacionPreguntas = ValidacionPreguntas;
ValidacionPreguntas.pregunta = zod_1.z.object({
    pregunta: zod_1.z.string().min(1, { message: "La pregunta es requerida" }),
    respuesta: zod_1.z.string().min(1, { message: "La respuesta es requerida" }),
});
function validarPregunta(data) {
    return ValidacionPreguntas.pregunta.safeParse(data);
}
function validarEditarPregunta(data) {
    return ValidacionPreguntas.pregunta.partial().safeParse(data);
}
