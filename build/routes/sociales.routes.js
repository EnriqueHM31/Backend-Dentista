"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SocialesRoutes = void 0;
const express_1 = require("express");
const social_1 = require("../controllers/social");
const verificarToken_1 = require("../middleware/verificarToken");
exports.SocialesRoutes = (0, express_1.Router)();
exports.SocialesRoutes.get('/', social_1.ContrallerSocial.getAll);
exports.SocialesRoutes.put('/:id', verificarToken_1.verificarTokenDesdeCookie, social_1.ContrallerSocial.updateSocial);
