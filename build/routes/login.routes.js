"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoginRouter = void 0;
const express_1 = require("express");
const login_1 = require("../controllers/login");
exports.LoginRouter = (0, express_1.Router)();
exports.LoginRouter.post('/', login_1.ControllerLogin.InicioSesion);
exports.LoginRouter.get("/autenticacion", login_1.ControllerLogin.Autenticacion);
exports.LoginRouter.get("/logout", login_1.ControllerLogin.Logout);
