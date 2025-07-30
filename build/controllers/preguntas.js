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
exports.ControllerPreguntas = void 0;
const preguntas_1 = require("../models/MySQL/preguntas");
const Validacion_1 = require("../utils/Validacion");
const Preguntas_1 = require("../utils/Validaciones/Preguntas");
class ControllerPreguntas {
    static getAll(_req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { success, message, preguntas } = yield preguntas_1.ModeloPreguntas.getAll();
                if (success) {
                    res.status(200).json({ success, message, preguntas });
                }
                else {
                    res.status(500).json({ success, message, preguntas: [] });
                }
            }
            catch (error) {
                res.status(500).json({ success: false, message: 'Error al obtener las preguntas', preguntas: [] });
            }
        });
    }
    static createPregunta(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const resultDataCrearPregunta = (0, Preguntas_1.validarPregunta)(req.body);
            if (resultDataCrearPregunta.error) {
                res.status(400).json({ success: false, message: JSON.parse(resultDataCrearPregunta.error.message) });
            }
            const dataCrearPregunta = resultDataCrearPregunta.data;
            const { success, message, pregunta } = yield preguntas_1.ModeloPreguntas.createPregunta(dataCrearPregunta);
            if (success) {
                res.status(200).json({ success, message, pregunta });
            }
            else {
                res.status(500).json({ success, message, pregunta: {} });
            }
        });
    }
    static updatePregunta(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const dataEditarPregunta = (0, Preguntas_1.validarEditarPregunta)(req.body);
            const dataIdEditarPregunta = (0, Validacion_1.validarId)({ id: req.params.id });
            if (dataIdEditarPregunta.error) {
                res.status(400).json({ success: false, message: dataIdEditarPregunta.error.message });
                return;
            }
            if (dataEditarPregunta.error) {
                res.status(400).json({ success: false, message: JSON.parse(dataEditarPregunta.error.message) });
                return;
            }
            const idPreguntaModificar = dataIdEditarPregunta.data.id;
            const preguntaAModificar = dataEditarPregunta.data;
            const { success, message, pregunta } = yield preguntas_1.ModeloPreguntas.updatePregunta({ id: idPreguntaModificar, camposPregunta: preguntaAModificar });
            if (success) {
                res.status(200).json({ success, message, pregunta });
            }
            else {
                res.status(500).json({ success, message, pregunta: {} });
            }
        });
    }
    static deletePregunta(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const dataIdEliminarPregunta = (0, Validacion_1.validarId)({ id: req.params.id });
            if (dataIdEliminarPregunta.error) {
                res.status(400).json({ success: false, message: dataIdEliminarPregunta.error.message });
                return;
            }
            const idPreguntaEliminar = dataIdEliminarPregunta.data.id;
            const { success, message, pregunta } = yield preguntas_1.ModeloPreguntas.deletePregunta({ id: idPreguntaEliminar });
            if (success) {
                res.status(200).json({ success, message, pregunta });
            }
            else {
                res.status(500).json({ success, message, pregunta: {} });
            }
        });
    }
}
exports.ControllerPreguntas = ControllerPreguntas;
