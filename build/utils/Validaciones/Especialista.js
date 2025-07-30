"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ValidacionEspecialista = void 0;
exports.validarEspecialista = validarEspecialista;
exports.validarEspecialistaEditar = validarEspecialistaEditar;
const zod_1 = require("zod");
class ValidacionEspecialista {
}
exports.ValidacionEspecialista = ValidacionEspecialista;
ValidacionEspecialista.especialista = zod_1.z.object({
    nombre: zod_1.z.string().min(1, { message: "El nombre es requerido" }),
    apellido: zod_1.z.string().min(1, { message: "El apellido es requerido" }),
    email: zod_1.z.string().min(1, { message: "El email es requerido" }).includes('@', { message: "El email no es valido" }),
    telefono: zod_1.z.string().min(1, { message: "El teléfono es requerido" }),
    direccion: zod_1.z.string().min(1, { message: "La dirección es requerida" }),
    avatar: zod_1.z.string().min(1, { message: "La imagen es requerida" }).startsWith("https://"),
    linkedin: zod_1.z.string().min(1, { message: "La referencia es requerida" }).startsWith("https://"),
    servicio: zod_1.z.string().min(1, { message: "El servicio es requerido" }),
});
function validarEspecialista(data) {
    return ValidacionEspecialista.especialista.safeParse(data);
}
function validarEspecialistaEditar(data) {
    return ValidacionEspecialista.especialista.partial().safeParse(data);
}
