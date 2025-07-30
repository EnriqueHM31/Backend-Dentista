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
exports.ContrallerSocial = void 0;
const social_1 = require("../models/MySQL/social");
const Validacion_1 = require("../utils/Validacion");
const Sociales_1 = require("../utils/Validaciones/Sociales");
class ContrallerSocial {
    static getAll(_req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { success, message, redesSociales } = yield social_1.ModeloSocial.getAll();
                if (success) {
                    res.status(200).json({ success, message, redesSociales });
                }
                else {
                    res.status(500).json({ success, message, redesSociales: [] });
                }
            }
            catch (error) {
                res.status(500).json({ message: 'Ocurrio un error interno del servidor' });
            }
        });
    }
    static updateSocial(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const resultDataReferenciaSocial = (0, Sociales_1.validarSocialEditar)(req.body);
            if (resultDataReferenciaSocial.error) {
                res.status(400).json({ success: false, message: resultDataReferenciaSocial.error.message });
                return;
            }
            const resultDataIdModificarSocial = (0, Validacion_1.validarId)(req.params);
            if (resultDataIdModificarSocial.error) {
                res.status(400).json({ success: false, message: resultDataIdModificarSocial.error.message });
                return;
            }
            const idSocialModificar = resultDataIdModificarSocial.data.id;
            const referencia = resultDataReferenciaSocial.data.referencia;
            const { success, message, redSocial } = yield social_1.ModeloSocial.updateSocial({ id: idSocialModificar, referencia });
            if (success) {
                res.status(200).json({ success, message, redSocial });
            }
            else {
                res.status(500).json({ success, message, redSocial: {} });
            }
        });
    }
}
exports.ContrallerSocial = ContrallerSocial;
