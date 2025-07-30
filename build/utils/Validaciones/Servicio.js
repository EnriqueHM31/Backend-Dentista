"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ValidacionServicio = void 0;
exports.validarServicio = validarServicio;
exports.validarEditarServicio = validarEditarServicio;
const zod_1 = require("zod");
class ValidacionServicio {
}
exports.ValidacionServicio = ValidacionServicio;
ValidacionServicio.servicio = zod_1.z.object({
    titulo: zod_1.z.string().min(1, { message: "El titulo es requerido" }),
    descripcion: zod_1.z.string().min(1, { message: "La descripción es requerida" }),
    img: zod_1.z.string().min(1, { message: "La imagen es requerida" }).startsWith("https://"),
    duration: zod_1.z.number().min(1, { message: "La duración es requerida" }).int({ message: "La duración debe ser un número entero" }),
});
function validarServicio(data) {
    return ValidacionServicio.servicio.safeParse(data);
}
function validarEditarServicio(data) {
    return ValidacionServicio.servicio.partial().safeParse(data);
}
