"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Validacion = void 0;
exports.validarId = validarId;
exports.validarEditarUsuario = validarEditarUsuario;
const zod_1 = require("zod");
class Validacion {
}
exports.Validacion = Validacion;
Validacion.idsObjetos = zod_1.z.object({
    id: zod_1.z.string().min(1, { message: "El id es requerido" }),
});
Validacion.especialista = zod_1.z.object({
    nombre: zod_1.z.string().min(1, { message: "El nombre es requerido" }),
    apellido: zod_1.z.string().min(1, { message: "El apellido es requerido" }),
    email: zod_1.z.string(),
    telefono: zod_1.z.string().min(1, { message: "El teléfono es requerido" }),
    direccion: zod_1.z.string().min(1, { message: "La dirección es requerida" }),
    avatar: zod_1.z.string().min(1, { message: "La imagen es requerida" }).startsWith("https://"),
    linkedin: zod_1.z.string().min(1, { message: "La referencia es requerida" }).startsWith("https://"),
});
Validacion.user = zod_1.z.object({
    username: zod_1.z.string().min(1, { message: "El nombre de usuario es requerido" }),
    password: zod_1.z.string().min(1, { message: "La contraseña es requerida" }),
});
function validarId(data) {
    return Validacion.idsObjetos.safeParse(data);
}
function validarEditarUsuario(data) {
    return Validacion.user.partial().safeParse(data);
}
