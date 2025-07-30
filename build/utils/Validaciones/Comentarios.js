"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ValidacionComentarios = void 0;
exports.validarComentario = validarComentario;
exports.validarComentarioEditar = validarComentarioEditar;
const zod_1 = require("zod");
class ValidacionComentarios {
}
exports.ValidacionComentarios = ValidacionComentarios;
ValidacionComentarios.comentario = zod_1.z.object({
    nombre: zod_1.z.string()
        .min(1, { message: "El nombre es requerido" }),
    ranking: zod_1.z.number()
        .min(1, { message: "El ranking es requerido" })
        .max(5, { message: "El ranking debe ser entre 1 y 5" }),
    email: zod_1.z.string(),
    servicio: zod_1.z.string(),
    mensaje: zod_1.z.string().min(1, { message: "El comentario es requerido" }),
});
ValidacionComentarios.comentarioEditar = zod_1.z.object({
    visible: zod_1.z.boolean(),
});
function validarComentario(data) {
    return ValidacionComentarios.comentario.safeParse(data);
}
function validarComentarioEditar(data) {
    return ValidacionComentarios.comentarioEditar.safeParse(data);
}
