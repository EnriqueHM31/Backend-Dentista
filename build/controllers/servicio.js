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
exports.ServiciosController = void 0;
const servicio_1 = require("../models/MySQL/servicio");
const Validacion_1 = require("../utils/Validacion");
const Servicio_1 = require("../utils/Validaciones/Servicio");
class ServiciosController {
    static crearServicio(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const resultDataCrearServicio = (0, Servicio_1.validarServicio)(req.body);
            if (resultDataCrearServicio.error) {
                res.status(400).json({ success: false, message: JSON.parse(resultDataCrearServicio.error.message) });
                return;
            }
            const dataCrearServicio = resultDataCrearServicio.data;
            const { success, message, servicio } = yield servicio_1.ModeloServicio.crearServicio(dataCrearServicio);
            if (success) {
                res.status(200).json({ success, message, servicio });
            }
            else {
                res.status(500).json({ success, message, servicio: {} });
            }
        });
    }
    static getServicios(_req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { success, message, servicios } = yield servicio_1.ModeloServicio.getServicios();
                if (success) {
                    res.status(200).json({ success, message, servicios });
                }
                else {
                    res.status(500).json({ success, message, servicios: [] });
                }
            }
            catch (error) {
                res.status(500).json({ success: false, message: 'Error al obtener los servicios', servicios: [] });
            }
        });
    }
    static getDisponibles(_req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { success, message, serviciosDisponibles: servicios } = yield servicio_1.ModeloServicio.getDisponibles();
                if (success) {
                    res.status(200).json({ success, message, servicios });
                }
                else {
                    res.status(500).json({ success, message, servicios: [] });
                }
            }
            catch (error) {
                res.status(500).json({ success: false, message: 'Error al obtener los servicios' });
            }
        });
    }
    static updateServicio(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const resultDataIdModificarServicio = (0, Validacion_1.validarId)(req.params);
            const resultDataModificarServicio = (0, Servicio_1.validarEditarServicio)(req.body);
            if (resultDataIdModificarServicio.error) {
                res.status(400).json({ success: false, message: resultDataIdModificarServicio.error.message, servicio: {} });
                return;
            }
            if (resultDataModificarServicio.error) {
                res.status(400).json({ success: false, message: JSON.parse(resultDataModificarServicio.error.message), servicio: {} });
                return;
            }
            const idServicioModificar = resultDataIdModificarServicio.data.id;
            const servicioAModificar = resultDataModificarServicio.data;
            const { success, message, servicio } = yield servicio_1.ModeloServicio.updateServicio({ id: idServicioModificar, cambiosServicio: servicioAModificar });
            if (success) {
                res.status(200).json({ success, message, servicio });
            }
            else {
                res.status(500).json({ success, message, servicio });
            }
        });
    }
    static deleteServicio(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const resultDataIdEliminarServicio = (0, Validacion_1.validarId)(req.params);
            if (resultDataIdEliminarServicio.error) {
                res.status(400).json({ success: false, message: resultDataIdEliminarServicio.error.message });
                return;
            }
            const dataIdEliminarComentario = resultDataIdEliminarServicio.data.id;
            const { success, message, servicio } = yield servicio_1.ModeloServicio.deleteServicio({ id: dataIdEliminarComentario });
            if (success) {
                res.status(200).json({ success, message, servicio });
            }
            else {
                res.status(500).json({ success, message, servicio });
            }
        });
    }
}
exports.ServiciosController = ServiciosController;
