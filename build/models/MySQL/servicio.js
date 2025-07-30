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
exports.ModeloServicio = void 0;
const db_1 = require("../../database/db");
const generador_1 = require("../../utils/generador");
class ModeloServicio {
    static crearServicio(_a) {
        return __awaiter(this, arguments, void 0, function* ({ titulo, descripcion, img, duration }) {
            try {
                const id = (0, generador_1.generarIdUnico)();
                const [resultCrearServicio] = yield db_1.db.query(`INSERT INTO serviciosdentales (id, titulo, descripcion, img, duration) VALUES (?, ?, ?, ?, 30)`, [id, titulo, descripcion, img, duration]);
                if (!resultCrearServicio)
                    throw new Error("No se pudo crear el servicio");
                const [resultServicioCreado] = yield db_1.db.query(`SELECT * FROM serviciosdentales WHERE id = ?`, [id]);
                if (!resultServicioCreado)
                    throw new Error("No se pudo obtener el servicio creado");
                const ServicioCreado = resultServicioCreado[0];
                return { success: true, message: 'Servicio creado correctamente', servicio: ServicioCreado };
            }
            catch (error) {
                return { success: false, message: error || 'Error al crear el servicio', servicio: {} };
            }
        });
    }
    static getServicios() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const [resultDataServicioss] = yield db_1.db.query(`SELECT id, titulo, descripcion, img, duration FROM serviciosdentales ORDER BY titulo ASC`);
                if (!resultDataServicioss)
                    throw new Error("No se pudo obtener los servicios");
                return { success: true, message: "Servicios obtenidos correctamente", servicios: resultDataServicioss };
            }
            catch (error) {
                return { success: false, message: 'Error en la base de datos', servicios: [] };
            }
        });
    }
    static getDisponibles() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const [resultDataServiciosDisponibles] = yield db_1.db.query(`SELECT s.id,s.titulo,s.descripcion,s.img,s.duration FROM serviciosdentales s LEFT JOIN especialistas e ON s.id = e.servicio WHERE e.servicio IS NULL;`);
                if (!resultDataServiciosDisponibles)
                    throw new Error("No se pudo obtener los servicios disponibles");
                return { success: true, message: "Servicios disponibles correctamente", serviciosDisponibles: resultDataServiciosDisponibles };
            }
            catch (error) {
                return { success: false, message: error || "Error al obtener los servicios disponibles", serviciosDisponibles: [] };
            }
        });
    }
    static updateServicio(_a) {
        return __awaiter(this, arguments, void 0, function* ({ id, cambiosServicio }) {
            const allowedFields = ['titulo', 'descripcion', 'img', 'duration']; // Campos permitidos
            const fields = [];
            const values = [];
            for (const key of Object.keys(cambiosServicio)) {
                if (allowedFields.includes(key) && cambiosServicio[key] !== undefined) {
                    fields.push(`${key} = ?`);
                    values.push(cambiosServicio[key]);
                }
            }
            if (fields.length === 0)
                return { success: false, message: 'No se proporcionaron campos válidos para actualizar', cambios: {}, };
            values.push(id); // Agrega el ID al final para el WHERE
            const query = `UPDATE serviciosdentales SET ${fields.join(', ')} WHERE id = ?`;
            try {
                const [resultEditarEspecialista] = yield db_1.db.query(query, values);
                if (!resultEditarEspecialista)
                    throw new Error('Error al editar el servicio');
                const [resultServicioEditado] = yield db_1.db.query(`SELECT * FROM serviciosdentales WHERE id = ?`, [id]);
                if (!resultServicioEditado)
                    throw new Error('Error al obtener el servicio editado');
                const ServicioEditado = resultServicioEditado[0];
                return { success: true, message: 'Servicio editado correctamente', servicio: ServicioEditado };
            }
            catch (error) {
                return { success: false, message: error || 'Error al editar el servicio', servicio: {} };
            }
        });
    }
    static deleteServicio(_a) {
        return __awaiter(this, arguments, void 0, function* ({ id }) {
            try {
                const [resultServicioEliminado] = yield db_1.db.query(`DELETE FROM ServiciosDentales WHERE id = ?`, [id]);
                if (!resultServicioEliminado)
                    throw new Error('Error al eliminar el servicio');
                return { success: true, message: 'Servicio eliminado correctamente', servicio: { id } };
            }
            catch (error) {
                return { success: false, message: 'Error al eliminar el servicio', servicio: {} };
            }
        });
    }
}
exports.ModeloServicio = ModeloServicio;
