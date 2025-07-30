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
exports.CitasController = void 0;
const citas_1 = require("../models/MySQL/citas");
const Validacion_1 = require("../utils/Validacion");
const Citas_1 = require("../utils/Validaciones/Citas");
class CitasController {
    static getAll(_req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { success, message, citas } = yield citas_1.ModeloCita.getAll();
                if (success) {
                    res.status(200).json({ success, message, citas });
                }
                else {
                    res.status(500).json({ success, message, citas: [] });
                }
            }
            catch (error) {
                res.status(500).json({ success: false, message: 'Error al obtener las citas' });
            }
        });
    }
    static createCita(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const resultDataCrearCita = (0, Citas_1.validarCita)(req.body);
            if (resultDataCrearCita.error) {
                res.status(400).json({ success: false, message: JSON.parse(resultDataCrearCita.error.message) });
                return;
            }
            const dataCrearCita = resultDataCrearCita.data;
            const { success, message, cita } = yield citas_1.ModeloCita.createCita(dataCrearCita);
            if (success) {
                res.status(200).json({ success, message, cita });
            }
            else {
                res.status(500).json({ success, message, cita: {} });
            }
        });
    }
    static deleteCita(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const resultDataIdEliminarCita = (0, Validacion_1.validarId)(req.params);
            if (resultDataIdEliminarCita.error) {
                res.status(400).json({ success: false, message: resultDataIdEliminarCita.error.message, cita: {} });
                return;
            }
            const idCitaEliminar = resultDataIdEliminarCita.data.id;
            const { success, message, cita } = yield citas_1.ModeloCita.deleteCita(idCitaEliminar);
            if (success) {
                res.status(200).json({ success, message, cita });
            }
            else {
                res.status(500).json({ success, message, cita: {} });
            }
        });
    }
    static updateCita(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const resultDataModificarCita = (0, Citas_1.validarCitaEditar)(req.body);
            if (resultDataModificarCita.error) {
                res.status(400).json({ success: false, message: JSON.parse(resultDataModificarCita.error.message) });
                return;
            }
            const resultDataIdModificarCita = (0, Validacion_1.validarId)(req.params);
            if (resultDataIdModificarCita.error) {
                res.status(400).json({ success: false, message: resultDataIdModificarCita.error.message });
                return;
            }
            const idCitaModificar = resultDataIdModificarCita.data.id;
            const dataModificarCita = resultDataModificarCita.data.completado;
            const { success, message, cita } = yield citas_1.ModeloCita.updateCita({ id: idCitaModificar, completado: dataModificarCita });
            if (success) {
                res.status(200).json({ success, message, cita });
            }
            else {
                res.status(500).json({ success, message, cita: {} });
            }
        });
    }
    static updateCitaAceptada(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const resultDataIdAceptada = (0, Validacion_1.validarId)(req.params);
            if (resultDataIdAceptada.error) {
                res.status(400).json({ success: false, message: resultDataIdAceptada.error.message, cita: {} });
                return;
            }
            const idCitaAceptada = resultDataIdAceptada.data.id;
            const { success, message, cita } = yield citas_1.ModeloCita.updateCitaAceptada({ id: idCitaAceptada });
            if (success) {
                res.status(200).json({ success, message, cita });
            }
            else {
                res.status(500).json({ success, message, cita: {} });
            }
        });
    }
}
exports.CitasController = CitasController;
