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
exports.ControllerEspecialistas = void 0;
const especialista_1 = require("../models/MySQL/especialista");
const Validacion_1 = require("../utils/Validacion");
const Especialista_1 = require("../utils/Validaciones/Especialista");
class ControllerEspecialistas {
    static getAll(_req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { success, message, especialistas } = yield especialista_1.ModeloEspecialista.getAll();
                if (success) {
                    res.status(200).json({ success, message, especialistas });
                }
                else {
                    res.status(500).json({ success, message, especialistas });
                }
            }
            catch (error) {
                res.status(500).json({ message: 'Ocurrio un error interno del servidor' });
            }
        });
    }
    static createEspecialista(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const resultDataEspecialista = (0, Especialista_1.validarEspecialista)(req.body);
            if (resultDataEspecialista.error) {
                res.status(400).json({ success: false, message: JSON.parse(resultDataEspecialista.error.message) });
                return;
            }
            const dataEspecialista = resultDataEspecialista.data;
            const { success, message, especialista } = yield especialista_1.ModeloEspecialista.createEspecialista({ dataEspecialista });
            if (success) {
                res.status(200).json({ success, message, especialista });
            }
            else {
                res.status(500).json({ success, message, especialista: {} });
            }
        });
    }
    static updateEspecialista(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const resultDataIdModificarEspecialista = (0, Validacion_1.validarId)(req.params);
            const resultDataModificarEspecialista = (0, Especialista_1.validarEspecialistaEditar)(req.body);
            if (resultDataIdModificarEspecialista.error) {
                res.status(400).json({ success: false, message: resultDataIdModificarEspecialista.error.message });
                return;
            }
            const idEspecialistaModificar = resultDataIdModificarEspecialista.data.id;
            const dataModificarEspecialista = resultDataModificarEspecialista.data;
            const { success, message, especialista } = yield especialista_1.ModeloEspecialista.updateEspecialista({ id: idEspecialistaModificar, dataEspecialista: dataModificarEspecialista });
            if (success) {
                res.status(200).json({ success, message, especialista });
            }
            else {
                res.status(500).json({ success, message, especialista });
            }
        });
    }
    static deleteEspecialista(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const resultDataIdEliminarEspecialista = (0, Validacion_1.validarId)(req.params);
            if (resultDataIdEliminarEspecialista.error) {
                res.status(400).json({ success: false, message: resultDataIdEliminarEspecialista.error.message });
                return;
            }
            const idEspecialistaEliminar = resultDataIdEliminarEspecialista.data.id;
            const { success, message, especialista } = yield especialista_1.ModeloEspecialista.deleteEspecialista({ id: idEspecialistaEliminar });
            if (success) {
                res.status(200).json({ success, message, especialista });
            }
            else {
                res.status(500).json({ success, message, especialista });
            }
        });
    }
}
exports.ControllerEspecialistas = ControllerEspecialistas;
