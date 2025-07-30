"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ValidacionCitas = void 0;
exports.validarCita = validarCita;
exports.validarCitaEditar = validarCitaEditar;
const zod_1 = require("zod");
class ValidacionCitas {
}
exports.ValidacionCitas = ValidacionCitas;
ValidacionCitas.citas = zod_1.z.object({
    nombre: zod_1.z.string().min(1, { message: "El nombre es requerido" }),
    email: zod_1.z.string().includes('@').min(1, { message: "El email es requerido" }),
    comentarios: zod_1.z.string().min(1, { message: "El mensaje es requerido" }),
    telefono: zod_1.z.string().min(1, { message: "El teléfono es requerido" }),
    servicio: zod_1.z.string(),
    fecha: zod_1.z.iso.date(),
    hora: zod_1.z.iso.time(),
});
ValidacionCitas.citasEditar = zod_1.z.object({
    completado: zod_1.z.boolean(),
});
function validarCita(data) {
    return ValidacionCitas.citas.safeParse(data);
}
function validarCitaEditar(data) {
    return ValidacionCitas.citasEditar.safeParse(data);
}
