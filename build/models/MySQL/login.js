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
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.ModeloLogin = exports.JWT_SECRET = void 0;
const db_1 = require("../../database/db");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
exports.JWT_SECRET = (_a = process.env.SECRET) !== null && _a !== void 0 ? _a : (() => {
    throw new Error("SECRET no está definido en .env");
})();
class ModeloLogin {
    static InicioSesion(username, password) {
        return __awaiter(this, void 0, void 0, function* () {
            const id = process.env.USUARIO_ID;
            try {
                const [result] = yield db_1.db.query('SELECT * FROM usuario WHERE id = ?', [id]);
                if (result.length === 0) {
                    return { success: false, message: 'Usuario no encontrado.', token: '' };
                }
                if (result[0].username !== username) {
                    return { success: false, message: 'Contraseña incorrecta.', token: '' };
                }
                if (result[0].password !== password) {
                    return { success: false, message: 'Contraseña incorrecta.', token: '' };
                }
                const token = jsonwebtoken_1.default.sign({ role: 'admin', username: result[0].username }, exports.JWT_SECRET, { expiresIn: '1h' });
                return { success: true, mesaage: 'Sesión iniciada correctamente', token: token };
            }
            catch (error) {
                return { success: false, message: 'Error al iniciar sesión', token: '' };
            }
        });
    }
}
exports.ModeloLogin = ModeloLogin;
