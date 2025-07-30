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
exports.ModeloSocial = void 0;
const db_1 = require("../../database/db");
const generador_1 = require("../../utils/generador");
class ModeloSocial {
    static getAll() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const [resultRedesSociales] = yield db_1.db.query('SELECT id, nombre, referencia FROM sociales');
                if (!resultRedesSociales)
                    throw new Error('Error obteniendo redes sociales');
                return { success: true, message: "Sociales obtenidos correctamente", redesSociales: resultRedesSociales };
            }
            catch (error) {
                return { success: false, message: error || "Error al obtener las redes sociales", redesSociales: {} };
            }
        });
    }
    static createSocial(_a) {
        return __awaiter(this, arguments, void 0, function* ({ referencia }) {
            try {
                const id = (0, generador_1.generarIdUnico)();
                const [resulCrearRedSocial] = yield db_1.db.query('INSERT INTO sociales (id, referencia) VALUES (?, ?)', [id, referencia]);
                if (!resulCrearRedSocial)
                    throw new Error('Error al crear la red social');
                return { success: true, message: "Red social creada correctamente", redSocial: resulCrearRedSocial };
            }
            catch (error) {
                return { success: false, message: error || "Error al crear la red social", redSocial: {} };
            }
        });
    }
    static deleteSocial(_a) {
        return __awaiter(this, arguments, void 0, function* ({ id }) {
            try {
                const [resultadoEliminarRedSocial] = yield db_1.db.query('DELETE FROM sociales WHERE id = ?', [id]);
                if (!resultadoEliminarRedSocial)
                    throw new Error('Error al eliminar la red social');
                return { success: true, message: "Red social eliminada correctamente", redSocial: { id } };
            }
            catch (error) {
                return { success: false, message: error || "Error al eliminar la red social", redSocial: {} };
            }
        });
    }
    static updateSocial(_a) {
        return __awaiter(this, arguments, void 0, function* ({ id, referencia }) {
            try {
                const [resultadoModificarRedSocial] = yield db_1.db.query('UPDATE sociales SET referencia = ? WHERE id = ?', [referencia, id]);
                if (!resultadoModificarRedSocial)
                    throw new Error('Error al modificar la red social');
                const [resultadoRedSocialObtenida] = yield db_1.db.query('SELECT id, referencia FROM Sociales WHERE id = ?', [id]);
                if (!resultadoRedSocialObtenida)
                    throw new Error('Error al obtener la red social modificada');
                const SocialEditar = resultadoRedSocialObtenida[0];
                return { success: true, message: "Red social actualizada correctamente", redSocial: SocialEditar };
            }
            catch (error) {
                return { success: false, message: error || 'Error al actualizar la red social', redSocial: {} };
            }
        });
    }
}
exports.ModeloSocial = ModeloSocial;
