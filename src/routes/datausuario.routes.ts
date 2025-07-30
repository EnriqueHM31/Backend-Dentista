import { Router } from 'express';
import { ContrallerUsuario } from '../controllers/usuario';
import { verificarTokenDesdeCookie } from '../middleware/verificarToken';

export const UsuarioRouter = Router();


UsuarioRouter.get('/', ContrallerUsuario.getUsuario);

UsuarioRouter.put('/', verificarTokenDesdeCookie, ContrallerUsuario.updateUsuario);