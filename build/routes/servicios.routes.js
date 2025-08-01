"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ServiciosRoutes = void 0;
const express_1 = require("express");
const servicio_1 = require("../controllers/servicio");
const verificarToken_1 = require("../middleware/verificarToken");
exports.ServiciosRoutes = (0, express_1.Router)();
exports.ServiciosRoutes.get('/disponibles', servicio_1.ServiciosController.getDisponibles);
exports.ServiciosRoutes.get('/', servicio_1.ServiciosController.getServicios);
exports.ServiciosRoutes.post('/', verificarToken_1.verificarTokenDesdeCookie, servicio_1.ServiciosController.crearServicio);
exports.ServiciosRoutes.put('/:id', verificarToken_1.verificarTokenDesdeCookie, servicio_1.ServiciosController.updateServicio);
exports.ServiciosRoutes.delete('/:id', verificarToken_1.verificarTokenDesdeCookie, servicio_1.ServiciosController.deleteServicio);
