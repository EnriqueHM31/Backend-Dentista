import { Router } from 'express';
import { ControllerEspecialistas } from '../controllers/especialista';
import { verificarTokenDesdeCookie } from '../middleware/verificarToken';

export const EspecialistasRouter = Router();

EspecialistasRouter.get('/', ControllerEspecialistas.getAll);
EspecialistasRouter.post('/', verificarTokenDesdeCookie, ControllerEspecialistas.createEspecialista);
EspecialistasRouter.patch('/:id', verificarTokenDesdeCookie, ControllerEspecialistas.updateEspecialista);
EspecialistasRouter.delete('/:id', verificarTokenDesdeCookie, ControllerEspecialistas.deleteEspecialista);

