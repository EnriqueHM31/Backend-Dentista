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
exports.ContrallerUsuario = void 0;
const usuario_1 = require("../models/MySQL/usuario");
const Validacion_1 = require("../utils/Validacion");
class ContrallerUsuario {
    static getUsuario(_req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { success, message, usuario } = yield usuario_1.ModeloUsuario.getUsuario();
                if (success) {
                    res.status(200).json({ success, message, usuario });
                }
                else {
                    res.status(500).json({ success, message, usuario: {} });
                }
            }
            catch (error) {
                res.status(500).json({ success: false, message: 'Error en la base de datos' });
            }
        });
    }
    static updateUsuario(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const resultDataModificarUsuario = (0, Validacion_1.validarEditarUsuario)(req.body);
            if (resultDataModificarUsuario.error) {
                res.status(400).json({ success: false, message: JSON.parse(resultDataModificarUsuario.error.message) });
                return;
            }
            const dataModificarUsuario = resultDataModificarUsuario.data;
            const { success, message, usuario } = yield usuario_1.ModeloUsuario.updateUsuario({ cambiosUsuario: dataModificarUsuario });
            if (success) {
                res.status(200).json({ success, message, usuario });
            }
            else {
                res.status(500).json({ success, message, usuario: {} });
            }
        });
    }
}
exports.ContrallerUsuario = ContrallerUsuario;
