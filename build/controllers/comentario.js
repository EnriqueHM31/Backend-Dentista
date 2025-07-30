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
exports.ContrallerContacto = void 0;
const comentario_1 = require("../models/MySQL/comentario");
const Validacion_1 = require("../utils/Validacion");
const Comentarios_1 = require("../utils/Validaciones/Comentarios");
class ContrallerContacto {
    static EnviarMensaje(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const resultDataComentario = (0, Comentarios_1.validarComentario)(req.body);
            if (!resultDataComentario.success) {
                res.status(400).json({ success: false, message: JSON.parse(resultDataComentario.error.message) });
                return;
            }
            const DataComentario = resultDataComentario.data;
            const { success, message, comentario } = yield comentario_1.ModeloContacto.EnviarMensaje(DataComentario);
            if (success) {
                res.status(200).json({ success, message, comentario });
            }
            else {
                res.status(500).json({ success, message, comentario: {} });
            }
        });
    }
    static getComentarios(_req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { success, message, comentarios } = yield comentario_1.ModeloContacto.getComentarios();
            if (success) {
                res.status(200).json({ success, message, comentarios });
            }
            else {
                res.status(500).json({ success, message, comentarios });
            }
        });
    }
    static getComentariosVisibles(_req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { success, message, comentarios } = yield comentario_1.ModeloContacto.getComentariosVisibles();
            if (success) {
                res.status(200).json({ success, message, comentarios });
            }
            else {
                res.status(500).json({ success, message, comentarios });
            }
        });
    }
    static updateComentario(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const resultDataVisible = (0, Comentarios_1.validarComentarioEditar)(req.body);
            if (resultDataVisible.error) {
                res.status(400).json({ success: false, message: JSON.parse(resultDataVisible.error.message) });
                return;
            }
            const resultdataIdEditarComentario = (0, Validacion_1.validarId)(req.params);
            if (resultdataIdEditarComentario.error) {
                res.status(400).json({ success: false, message: resultdataIdEditarComentario.error.message });
                return;
            }
            const idComentarioModificar = resultdataIdEditarComentario.data.id;
            const visibleComentario = resultDataVisible.data.visible;
            const { success, message, comentario } = yield comentario_1.ModeloContacto.updateComentario({ id: idComentarioModificar, visible: visibleComentario });
            if (success) {
                res.status(200).json({ success, message, comentario });
            }
            else {
                res.status(500).json({ success, message, comentario: {} });
            }
        });
    }
    static deleteComentario(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const dataIdEliminarComentario = (0, Validacion_1.validarId)(req.params);
            if (dataIdEliminarComentario.error) {
                res.status(400).json({ success: false, message: dataIdEliminarComentario.error.message });
                return;
            }
            const idComentarioEliminar = dataIdEliminarComentario.data.id;
            const { success, message, comentario } = yield comentario_1.ModeloContacto.deleteComentario({ id: idComentarioEliminar });
            if (success) {
                res.status(200).json({ success, message, comentario });
            }
            else {
                res.status(500).json({ success, message, comentario });
            }
        });
    }
}
exports.ContrallerContacto = ContrallerContacto;
