import { Router } from 'express';
import { ContrallerContacto } from '../controllers/comentario';
import { verificarTokenDesdeCookie } from '../middleware/verificarToken';

export const ComentariosRouter = Router();

ComentariosRouter.get('/', ContrallerContacto.getComentarios)

ComentariosRouter.post('/', ContrallerContacto.EnviarMensaje)

ComentariosRouter.get('/visibles', ContrallerContacto.getComentariosVisibles)

ComentariosRouter.put('/:id', verificarTokenDesdeCookie, ContrallerContacto.updateComentario)

ComentariosRouter.delete('/:id', verificarTokenDesdeCookie, ContrallerContacto.deleteComentario)