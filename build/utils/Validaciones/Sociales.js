"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ValidacionSociales = void 0;
exports.validarSocial = validarSocial;
exports.validarSocialEditar = validarSocialEditar;
const zod_1 = require("zod");
class ValidacionSociales {
}
exports.ValidacionSociales = ValidacionSociales;
ValidacionSociales.sociales = zod_1.z.object({
    nombre: zod_1.z.string().min(1, { message: "El nombre es requerido" }),
    referencia: zod_1.z.string().min(1, { message: "La referencia es requerida" }),
});
ValidacionSociales.socialesEditar = zod_1.z.object({
    referencia: zod_1.z.string().min(1, { message: "La referencia es requerida" }),
});
function validarSocial(data) {
    return ValidacionSociales.sociales.safeParse(data);
}
function validarSocialEditar(data) {
    return ValidacionSociales.socialesEditar.safeParse(data);
}
