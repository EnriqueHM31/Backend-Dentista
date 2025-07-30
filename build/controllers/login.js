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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ControllerLogin = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const login_1 = require("../models/MySQL/login");
const config_1 = require("../config");
const config_2 = require("../config");
class ControllerLogin {
    static InicioSesion(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { username, password } = req.body;
            if (!username || !password) {
                res.status(200).json({ success: false, message: 'Credenciales incompletas.' });
            }
            if (typeof username !== 'string' || typeof password !== 'string') {
                res.status(200).json({ success: false, message: 'Credenciales incorrectas.' });
            }
            try {
                const { success, message, token } = yield login_1.ModeloLogin.InicioSesion(username, password);
                if (!success) {
                    res.status(200).json({ success: false, message: message });
                }
                res.cookie(config_1.NOMBRE_COOKIE, token, {
                    httpOnly: true,
                    secure: config_1.NODE_ENV === 'production',
                    sameSite: 'lax',
                    maxAge: 60 * 60 * 1000,
                });
                res.status(200).json({ success: true, message: 'Sesión iniciada correctamente' });
            }
            catch (error) {
                res.status(500).json({ success: false, message: 'Error al iniciar sesión: ' + error });
            }
        });
    }
    static Autenticacion(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const token = req.cookies.token;
            if (!config_2.SECRET) {
                throw new Error("Ocurrió un error al verificar el token");
            }
            if (!token) {
                res.status(200).json({ success: false, message: 'No autorizado' });
            }
            try {
                const decoded = jsonwebtoken_1.default.verify(token, config_2.SECRET);
                res.json({ success: true, message: { role: decoded.role, username: decoded.username } });
            }
            catch (error) {
                res.status(401).json({ success: false, message: 'Token inválido o expirado' });
            }
        });
    }
    static Logout(_req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                res.clearCookie(config_1.NOMBRE_COOKIE);
                res.status(200).json({ success: true, message: 'Sesión cerrada correctamente' });
            }
            catch (error) {
                res.status(500).json({ success: false, message: 'Error al cerrar sesión' });
            }
        });
    }
}
exports.ControllerLogin = ControllerLogin;
