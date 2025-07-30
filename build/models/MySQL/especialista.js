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
exports.ModeloEspecialista = void 0;
const db_1 = require("../../database/db");
const generador_1 = require("../../utils/generador");
class ModeloEspecialista {
    static getAll() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const [resultDataEspecialistas] = yield db_1.db.query(`SELECT e.id,e.nombre,e.apellido,e.email,e.telefono,e.direccion,e.avatar,e.linkedin,e.servicio,s.titulo AS servicio FROM especialistas e JOIN serviciosdentales s ON e.servicio = s.id ORDER BY e.nombre, e.apellido ASC;`);
                if (!resultDataEspecialistas)
                    throw new Error('Error obteniendo especialistas');
                return { success: true, message: "Especialistas obtenidos correctamente", especialistas: resultDataEspecialistas };
            }
            catch (error) {
                return { success: false, message: error || "Error al obtener los especialistas", especialistas: {} };
            }
        });
    }
    static createEspecialista(_a) {
        return __awaiter(this, arguments, void 0, function* ({ dataEspecialista }) {
            try {
                const id = (0, generador_1.generarIdUnico)();
                const { nombre, apellido, email, telefono, direccion, avatar, linkedin, servicio } = dataEspecialista;
                const [resultCrearEspecialista] = yield db_1.db.query(`INSERT INTO especialistas (id, nombre, apellido, email, telefono, direccion, avatar, linkedin, servicio) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`, // puedes agregar más en el futuro
                [id, nombre, apellido, email, telefono, direccion, avatar, linkedin, servicio]);
                if (!resultCrearEspecialista)
                    throw new Error('Error al crear el especialista');
                const [resultEspecialistaCreado] = yield db_1.db.query(`SELECT E.id,E.nombre,E.apellido,E.email,E.telefono,E.direccion,E.avatar,E.linkedin,S.titulo AS servicio FROM especialistas E LEFT JOIN serviciosdentales S ON E.servicio = S.id WHERE E.id = ?`, [id]);
                if (!resultEspecialistaCreado)
                    throw new Error('Error al obtener el especialista creado');
                const especialistaCreado = resultEspecialistaCreado[0];
                return { success: true, message: 'Especialista creado correctamente', especialista: especialistaCreado };
            }
            catch (error) {
                return { success: false, message: error || 'Error al crear el especialista', especialista: {} };
            }
        });
    }
    static updateEspecialista(_a) {
        return __awaiter(this, arguments, void 0, function* ({ id, dataEspecialista }) {
            try {
                const allowedFields = ['nombre', 'apellido', 'email', 'telefono', 'direccion', 'avatar', 'linkedin', 'servicio'];
                const fields = [];
                const values = [];
                for (const key of Object.keys(dataEspecialista)) {
                    if (allowedFields.includes(key) && dataEspecialista[key] !== undefined) {
                        fields.push(`${key} = ?`);
                        values.push(dataEspecialista[key]);
                    }
                }
                if (fields.length === 0) {
                    return { success: false, message: 'No se proporcionaron campos para actualiar', especialista: {} };
                }
                values.push(id);
                const query = `UPDATE Especialistas SET ${fields.join(', ')} WHERE id = ?`;
                const [resultEditarEspecialista] = yield db_1.db.query(query, values);
                if (!resultEditarEspecialista)
                    throw new Error('Error al editar el especialista');
                const [resultEspecialistaEditado] = yield db_1.db.query(`SELECT E.id,E.nombre,E.apellido,E.email,E.telefono,E.direccion,E.avatar,E.linkedin,S.titulo AS servicio, S.id AS id_servicio FROM especialistas E LEFT JOIN serviciosdentales S ON E.servicio = S.id WHERE E.id = ?`, [id]);
                console.log("entro", resultEspecialistaEditado);
                if (!resultEspecialistaEditado)
                    throw new Error('Error al obtener el especialista editado');
                const EspecialistaEditado = resultEspecialistaEditado[0];
                return { success: true, message: 'Especialista editado correctamente', especialista: EspecialistaEditado };
            }
            catch (error) {
                return { success: false, message: error || 'Error al editar el especialista', especialista: {} };
            }
        });
    }
    static deleteEspecialista(_a) {
        return __awaiter(this, arguments, void 0, function* ({ id }) {
            try {
                const [resultEliminarEspecialista] = yield db_1.db.query(`DELETE FROM especialistas WHERE id = ?`, [id]);
                if (!resultEliminarEspecialista)
                    throw new Error('Error al eliminar el especialista');
                return { success: true, message: 'Especialista eliminado correctamente', especialista: { id } };
            }
            catch (error) {
                return { success: false, message: error || 'Error al eliminar el especialista', especialista: {} };
            }
        });
    }
}
exports.ModeloEspecialista = ModeloEspecialista;
