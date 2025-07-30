
import { Router } from 'express';
import { ControllerPreguntas } from '../controllers/preguntas';
import { verificarTokenDesdeCookie } from '../middleware/verificarToken';
export const PreguntasRoutes = Router();

PreguntasRoutes.get('/', ControllerPreguntas.getAll);

PreguntasRoutes.post('/', verificarTokenDesdeCookie, ControllerPreguntas.createPregunta);

PreguntasRoutes.put('/:id', verificarTokenDesdeCookie, ControllerPreguntas.updatePregunta);

PreguntasRoutes.delete('/:id', verificarTokenDesdeCookie, ControllerPreguntas.deletePregunta);