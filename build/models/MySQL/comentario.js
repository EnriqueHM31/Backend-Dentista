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
exports.ModeloContacto = void 0;
const contacto_1 = require("../../utils/contacto");
const db_1 = require("../../database/db");
const mensaje_1 = require("../../utils/mensaje");
const generador_1 = require("../../utils/generador");
class ModeloContacto {
    static getComentarios() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const [Comentarios] = yield db_1.db.query('SELECT * FROM comentarios');
                if (!Comentarios)
                    throw new Error('Error obteniendo comentarios');
                return { success: true, message: "Comentarios obtenidos correctamente", comentarios: Comentarios };
            }
            catch (error) {
                return { success: false, message: error || 'Error con obtener comentarios', comentarios: {} };
            }
        });
    }
    static getComentariosVisibles() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const [ComentariosVisibles] = yield db_1.db.query('SELECT * FROM comentarios WHERE visible = 1');
                if (!ComentariosVisibles)
                    throw new Error('Error obteniendo comentarios visibles');
                return { success: true, message: "Comentarios obtenidos correctamente", comentarios: ComentariosVisibles };
            }
            catch (error) {
                return { success: false, message: error || 'Error con obtener comentarios visibles', comentarios: {} };
            }
        });
    }
    static EnviarMensaje(_a) {
        return __awaiter(this, arguments, void 0, function* ({ nombre, ranking, email, servicio, mensaje }) {
            const mailOptions = (0, mensaje_1.MensajeCorreo)({ nombre, ranking, email, servicio, mensaje });
            try {
                const info = yield contacto_1.transporter.sendMail(mailOptions);
                if (!info.accepted)
                    throw new Error('Error enviando el mensaje');
                const id = (0, generador_1.generarIdUnico)();
                const [resultInsertarComentario] = yield db_1.db.query('INSERT INTO comentarios (id, nombre, ranking, email, servicio, mensaje, visible) VALUES (?, ?, ?, ?, ?, ?, ?)', [id, nombre, ranking, email, servicio, mensaje, true]);
                if (!resultInsertarComentario)
                    throw new Error('Error al guardar el mensaje');
                const [Comentario] = yield db_1.db.query(`SELECT * FROM comentarios WHERE id = ?`, [id]);
                if (!Comentario)
                    throw new Error('Error al obtener el mensaje');
                const ComentarioGuardado = Comentario[0];
                return { success: true, message: 'Comentario enviado correctamente', comentario: ComentarioGuardado };
            }
            catch (error) {
                return { success: false, message: error || 'Error enviando el mensaje', comentario: {} };
            }
        });
    }
    static updateComentario(_a) {
        return __awaiter(this, arguments, void 0, function* ({ id, visible }) {
            try {
                const [resultModificarComentario] = yield db_1.db.query('UPDATE comentarios SET visible = ? WHERE id = ?', [visible, id]);
                if (!resultModificarComentario)
                    throw new Error('Error al modificar el comentario');
                const [resultComentarioModificado] = yield db_1.db.query('SELECT id, visible FROM Comentarios WHERE id = ?', [id]);
                if (!resultComentarioModificado)
                    throw new Error('Error al obtener el comentario modificado');
                const ComentarioModificado = resultComentarioModificado[0];
                return { success: true, message: "Comentario actualizado correctamente", comentario: ComentarioModificado };
            }
            catch (error) {
                return { success: false, message: error || 'Error al actualizar el comentario', comentario: {} };
            }
        });
    }
    static deleteComentario(_a) {
        return __awaiter(this, arguments, void 0, function* ({ id }) {
            try {
                const [resultEliminarComentario] = yield db_1.db.query('DELETE FROM comentarios WHERE id = ?', [id]);
                if (!resultEliminarComentario)
                    throw new Error('Error al eliminar el comentario');
                return { success: true, message: "Se elimino el comentario", comentario: { id } };
            }
            catch (error) {
                return { success: false, message: error || 'Error al eliminar el comentario', comentario: {} };
            }
        });
    }
}
exports.ModeloContacto = ModeloContacto;
