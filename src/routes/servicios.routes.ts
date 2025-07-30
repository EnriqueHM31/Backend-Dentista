import { Router } from 'express'
import { ServiciosController } from '../controllers/servicio'
import { verificarTokenDesdeCookie } from '../middleware/verificarToken'

export const ServiciosRoutes = Router()

ServiciosRoutes.get('/disponibles', ServiciosController.getDisponibles)

ServiciosRoutes.get('/', ServiciosController.getServicios)

ServiciosRoutes.post('/', verificarTokenDesdeCookie, ServiciosController.crearServicio)

ServiciosRoutes.put('/:id', verificarTokenDesdeCookie, ServiciosController.updateServicio)

ServiciosRoutes.delete('/:id', verificarTokenDesdeCookie, ServiciosController.deleteServicio)



