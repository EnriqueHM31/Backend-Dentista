import { Router } from 'express';
import { ContrallerSocial } from '../controllers/social';
import { verificarTokenDesdeCookie } from '../middleware/verificarToken';


export const SocialesRoutes = Router();

SocialesRoutes.get('/', ContrallerSocial.getAll)

SocialesRoutes.put('/:id', verificarTokenDesdeCookie, ContrallerSocial.updateSocial)