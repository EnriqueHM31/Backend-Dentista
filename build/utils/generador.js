"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generarIdUnico = void 0;
const crypto_1 = require("crypto");
const generarIdUnico = () => {
    return (0, crypto_1.randomUUID)();
};
exports.generarIdUnico = generarIdUnico;
