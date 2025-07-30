"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ModeloUsuario = void 0;
const db_1 = require("../../database/db");
const Validacion_1 = require("../../utils/Validacion");
const config_1 = require("../../config");
class ModeloUsuario {
    static getUsuario() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (!config_1.USUARIO_ID)
                    throw new Error("No se ha definido el ID de usuario");
                const resultID = (0, Validacion_1.validarId)({ id: config_1.USUARIO_ID });
                if (resultID.error) {
                    return { success: false, message: 'ID de usuario no válido', usuario: {} };
                }
                const ID_USER = resultID.data.id;
                const [resultDataUsuario] = yield db_1.db.query(`SELECT username, password FROM usuario WHERE id = ?`, [ID_USER]);
                if (!resultDataUsuario)
                    throw new Error("No se ha encontrado el usuario");
                const Datausuario = resultDataUsuario[0];
                return {
                    success: true, message: "Usuario obtenido correctamente", usuario: Datausuario
                };
            }
            catch (error) {
                return { success: false, message: error || "Error al obtener el usuario", usuario: {} };
            }
        });
    }
    static updateUsuario(_a) {
        return __awaiter(this, arguments, void 0, function* ({ cambiosUsuario }) {
            try {
                if (!config_1.USUARIO_ID)
                    throw new Error("No se ha definido el ID de usuario");
                const resultID = (0, Validacion_1.validarId)({ id: config_1.USUARIO_ID });
                if (resultID.error) {
                    return { success: false, message: 'ID de usuario no válido' };
                }
                const allowedFields = ['username', 'password'];
                const fields = [];
                const values = [];
                for (const key of Object.keys(cambiosUsuario)) {
                    if (allowedFields.includes(key) && cambiosUsuario[key] !== undefined) {
                        fields.push(`${key} = ?`);
                        values.push(cambiosUsuario[key]);
                    }
                }
                if (fields.length === 0) {
                    return { success: false, message: 'No se proporcionaron campos para actualizar' };
                }
                const ID_USER = resultID.data.id;
                values.push(ID_USER);
                const query = `UPDATE usuario SET ${fields.join(', ')} WHERE id = ?`;
                const [resultModificarUsuario] = yield db_1.db.query(query, values);
                if (!resultModificarUsuario)
                    throw new Error('Error al modificar el usuario');
                const [resultUsuarioModificado] = yield db_1.db.query('SELECT * FROM usuario WHERE id = ?', [ID_USER]);
                if (!resultUsuarioModificado)
                    throw new Error('Error al obtener el usuario modificado');
                const UsuarioModificado = resultUsuarioModificado[0];
                return { success: true, message: "Usuario actualizado correctamente", usuario: UsuarioModificado };
            }
            catch (error) {
                return { success: false, message: error || 'Error al actualizar el usuario', usuario: {} };
            }
        });
    }
}
exports.ModeloUsuario = ModeloUsuario;
