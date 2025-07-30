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
exports.ModeloCita = void 0;
const db_1 = require("../../database/db");
const contacto_1 = require("../../utils/contacto");
const generador_1 = require("../../utils/generador");
const mensaje_1 = require("../../utils/mensaje");
class ModeloCita {
    static getAll() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const [rows] = yield db_1.db.query(`SELECT C.id,C.nombre, C.email, C.telefono, S.titulo AS servicio, C.comentarios, C.fecha, C.hora, C.completada, C.aceptada FROM citas C JOIN serviciosdentales S ON C.servicio = S.id ORDER BY C.fecha ASC`);
                return { success: true, message: "Citas obtenidas correctamente", citas: rows };
            }
            catch (error) {
                return { success: false, message: 'Error en la base de datos + error: ' + error, citas: [] };
            }
        });
    }
    static createCita(_a) {
        return __awaiter(this, arguments, void 0, function* ({ nombre, email, telefono, servicio, comentarios, fecha, hora }) {
            try {
                const id = (0, generador_1.generarIdUnico)();
                const [ResultInsertCita] = yield db_1.db.query(`INSERT INTO citas (id, nombre, email, telefono, comentarios, servicio, fecha, hora) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`, [id, nombre, email, telefono, comentarios, servicio, fecha, hora]);
                if (!ResultInsertCita)
                    return { success: false, message: 'No se insertó la cita', cita: {} };
                const [ResultCitaCreada] = yield db_1.db.query(`SELECT C.id,C.nombre, C.email, C.telefono, S.titulo AS servicio, C.comentarios, C.fecha, C.hora, C.completada, C.aceptada FROM citas C JOIN serviciosdentales S ON C.servicio = S.id AND C.id = ?`, [id]);
                if (!ResultCitaCreada)
                    return { success: false, message: 'No se insertó la cita', cita: {} };
                const CitaCreada = ResultCitaCreada[0];
                return { success: true, message: 'Cita creada correctamente', cita: CitaCreada };
            }
            catch (error) {
                return { success: false, message: 'Error al crear la cita', cita: {} };
            }
        });
    }
    static deleteCita(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const [resultCitaEliminada] = yield db_1.db.query(`DELETE FROM citas WHERE id = ?`, [id]);
                if (resultCitaEliminada) {
                    return { success: true, message: 'Cita eliminada correctamente', cita: { id } };
                }
                else {
                    return { success: false, message: 'No se encontró la cita o no se realizaron cambios', cita: {} };
                }
            }
            catch (error) {
                return { success: false, message: 'Error al eliminar la cita', cita: {} };
            }
        });
    }
    static updateCita(_a) {
        return __awaiter(this, arguments, void 0, function* ({ id, completado }) {
            try {
                const [resultCitaModificada] = yield db_1.db.query(`UPDATE Citas SET completada = ? WHERE id = ?`, [completado, id]);
                if (resultCitaModificada) {
                    return { success: true, message: 'Cita actualizada correctamente', cita: { id, completado } };
                }
                else {
                    return { success: false, message: 'No se encontró la cita o no se realizaron cambios', cambios: {} };
                }
            }
            catch (error) {
                return { success: false, message: 'Error al actualizar la cita', cita: {} };
            }
        });
    }
    static updateCitaAceptada(_a) {
        return __awaiter(this, arguments, void 0, function* ({ id }) {
            try {
                const VALOR_ACEPTAR = true;
                const [resultCitaModificada] = yield db_1.db.query(`UPDATE Citas SET aceptada = ? WHERE id = ?`, [VALOR_ACEPTAR, id]);
                if (!resultCitaModificada)
                    throw new Error('No se encontró la cita o no se realizaron cambios');
                const [dataCitaAceptada] = yield db_1.db.query(`SELECT C.id,C.nombre, C.email, C.telefono, S.titulo AS servicio, C.comentarios, C.fecha, C.hora, C.completada, C.aceptada FROM Citas C JOIN ServiciosDentales S ON C.servicio = S.id AND C.id = ?`, [id]);
                const citaAceptada = dataCitaAceptada[0];
                const mailOptions = (0, mensaje_1.MensajeCorreoAceptarSolicitud)(citaAceptada);
                const info = yield contacto_1.transporter.sendMail(mailOptions);
                if (!info.accepted)
                    throw new Error('Error enviando el mensaje');
                return { success: true, message: 'Cita actualizada correctamente', cita: { id } };
            }
            catch (error) {
                return { success: false, message: error || 'Error al actualizar la cita', cita: {} };
            }
        });
    }
}
exports.ModeloCita = ModeloCita;
