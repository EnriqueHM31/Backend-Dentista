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
exports.ModeloPreguntas = void 0;
const db_1 = require("../../database/db");
const generador_1 = require("../../utils/generador");
class ModeloPreguntas {
    static getAll() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const [resultPreguntas] = yield db_1.db.query('SELECT id, pregunta, respuesta FROM preguntas ORDER BY pregunta ASC');
                if (!resultPreguntas)
                    throw new Error('Error obteniendo preguntas');
                return { success: true, message: "Preguntas obtenidas correctamente", preguntas: resultPreguntas };
            }
            catch (error) {
                return { success: false, message: error || "Error al obtener las preguntas", preguntas: {} };
            }
        });
    }
    static createPregunta(_a) {
        return __awaiter(this, arguments, void 0, function* ({ pregunta, respuesta }) {
            try {
                const id = (0, generador_1.generarIdUnico)();
                const [resultInsertarPregunta] = yield db_1.db.query('INSERT INTO preguntas (id, pregunta, respuesta) VALUES (?, ?, ?)', [id, pregunta, respuesta]);
                if (!resultInsertarPregunta)
                    throw new Error('Error al crear la pregunta');
                const [resultPreguntaCreada] = yield db_1.db.query('SELECT * FROM preguntas WHERE id = ?', [id]);
                if (!resultPreguntaCreada)
                    throw new Error('Error al obtener la pregunta creada');
                const PreguntaCreada = resultPreguntaCreada[0];
                return { success: true, message: "Pregunta creada correctamente", pregunta: PreguntaCreada };
            }
            catch (error) {
                return { success: false, message: error || "Error al crear la pregunta", pregunta: {} };
            }
        });
    }
    static updatePregunta(_a) {
        return __awaiter(this, arguments, void 0, function* ({ id, camposPregunta }) {
            try {
                const allowedFields = ['pregunta', 'respuesta']; // Campos permitidos
                const fields = [];
                const values = [];
                for (const key of Object.keys(camposPregunta)) {
                    if (allowedFields.includes(key) && camposPregunta[key] !== undefined) {
                        fields.push(`${key} = ?`);
                        values.push(camposPregunta[key]);
                    }
                }
                if (fields.length === 0) {
                    return { success: false, message: 'No se proporcionaron campos válidos para actualizar', pregunta: {} };
                }
                values.push(id);
                const query = `UPDATE preguntas SET ${fields.join(', ')} WHERE id = ?`;
                const [ResultModificarPregunta] = yield db_1.db.query(query, values);
                if (!ResultModificarPregunta)
                    throw new Error('Error al modificar la pregunta');
                const [ResultPreguntaModificada] = yield db_1.db.query('SELECT * FROM preguntas WHERE id = ?', [id]);
                if (!ResultPreguntaModificada)
                    throw new Error('Error al obtener la pregunta modificada');
                const PreguntaModificada = ResultPreguntaModificada[0];
                return { success: true, message: "Pregunta actualizada correctamente", pregunta: PreguntaModificada };
            }
            catch (error) {
                return { success: false, message: error || 'Error al actualizar la pregunta', pregunta: {} };
            }
        });
    }
    static deletePregunta(_a) {
        return __awaiter(this, arguments, void 0, function* ({ id }) {
            try {
                const [resultEliminarPregunta] = yield db_1.db.query('DELETE FROM preguntas WHERE id = ?', [id]);
                if (!resultEliminarPregunta)
                    throw new Error('Error al eliminar la pregunta');
                return { success: true, message: "Pregunta eliminada correctamente", pregunta: { id } };
            }
            catch (error) {
                return { success: false, message: error || 'Error al eliminar la pregunta', pregunta: {} };
            }
        });
    }
}
exports.ModeloPreguntas = ModeloPreguntas;
