import { Request, Response } from 'express';
import { ModeloServicio } from '../models/MySQL/servicio';
import { validarId } from '../utils/Validacion';
import { validarEditarServicio, validarServicio } from '../utils/Validaciones/Servicio';
import { UUID } from '../types/types';
import { ServicioCrearProps } from '../types/servicio';


export class ServiciosController {

    static async crearServicio(req: Request, res: Response) {

        const resultDataCrearServicio = validarServicio(req.body);

        if (resultDataCrearServicio.error) {
            res.status(400).json({ success: false, message: JSON.parse(resultDataCrearServicio.error.message) });
            return;
        }

        const dataCrearServicio = resultDataCrearServicio.data as ServicioCrearProps;

        const { success, message, servicio } = await ModeloServicio.crearServicio(dataCrearServicio);

        if (success) {
            res.status(200).json({ success, message, servicio });
        } else {
            res.status(500).json({ success, message, servicio: {} });
        }
    }

    static async getServicios(_req: Request, res: Response) {
        try {
            const { success, message, servicios } = await ModeloServicio.getServicios();

            if (success) {
                res.status(200).json({ success, message, servicios });
            }
            else {
                res.status(500).json({ success, message, servicios: [] });
            }
        } catch (error) {
            res.status(500).json({ success: false, message: 'Error al obtener los servicios', servicios: [] });
        }
    }

    static async getDisponibles(_req: Request, res: Response) {
        try {
            const { success, message, serviciosDisponibles: servicios } = await ModeloServicio.getDisponibles();

            if (success) {
                res.status(200).json({ success, message, servicios });
            }
            else {
                res.status(500).json({ success, message, servicios: [] });
            }
        }
        catch (error) {
            res.status(500).json({ success: false, message: 'Error al obtener los servicios' });
        }
    }

    static async updateServicio(req: Request, res: Response) {
        const resultDataIdModificarServicio = validarId(req.params as { id: UUID });
        const resultDataModificarServicio = validarEditarServicio(req.body);

        if (resultDataIdModificarServicio.error) {
            res.status(400).json({ success: false, message: resultDataIdModificarServicio.error.message, servicio: {} });
            return;
        }

        if (resultDataModificarServicio.error) {
            res.status(400).json({ success: false, message: JSON.parse(resultDataModificarServicio.error.message), servicio: {} });
            return;
        }

        const idServicioModificar = resultDataIdModificarServicio.data.id as UUID;
        const servicioAModificar = resultDataModificarServicio.data as ServicioCrearProps

        const { success, message, servicio } = await ModeloServicio.updateServicio({ id: idServicioModificar, cambiosServicio: servicioAModificar });

        if (success) {
            res.status(200).json({ success, message, servicio });
        } else {
            res.status(500).json({ success, message, servicio });
        }
    }

    static async deleteServicio(req: Request, res: Response) {
        const resultDataIdEliminarServicio = validarId(req.params as { id: UUID });

        if (resultDataIdEliminarServicio.error) {
            res.status(400).json({ success: false, message: resultDataIdEliminarServicio.error.message });
            return;
        }

        const dataIdEliminarComentario = resultDataIdEliminarServicio.data.id as UUID;

        const { success, message, servicio } = await ModeloServicio.deleteServicio({ id: dataIdEliminarComentario })

        if (success) {
            res.status(200).json({ success, message, servicio });
        } else {
            res.status(500).json({ success, message, servicio });
        }
    }


}