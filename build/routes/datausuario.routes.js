"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsuarioRouter = void 0;
const express_1 = require("express");
const usuario_1 = require("../controllers/usuario");
const verificarToken_1 = require("../middleware/verificarToken");
exports.UsuarioRouter = (0, express_1.Router)();
exports.UsuarioRouter.get('/', usuario_1.ContrallerUsuario.getUsuario);
exports.UsuarioRouter.put('/', verificarToken_1.verificarTokenDesdeCookie, usuario_1.ContrallerUsuario.updateUsuario);
