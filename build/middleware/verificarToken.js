"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verificarTokenDesdeCookie = void 0;
// Middleware para verificar JWT en cookie
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = require("../config");
const verificarTokenDesdeCookie = (req, res, next) => {
    const token = req.cookies.token;
    if (!config_1.SECRET) {
        throw new Error("Ocurrió un error al verificar el token");
    }
    if (!token) {
        res.status(401).json({ success: false, message: "Token no proporcionado" });
    }
    try {
        jsonwebtoken_1.default.verify(token, config_1.SECRET);
        next();
    }
    catch (err) {
        res.status(403).json({ success: false, message: "Token inválido o expirado" });
    }
};
exports.verificarTokenDesdeCookie = verificarTokenDesdeCookie;
