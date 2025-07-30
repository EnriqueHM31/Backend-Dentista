
import { Request, Response } from 'express';
import { ModeloCita } from '../models/MySQL/citas';
import { validarId } from '../utils/Validacion';
import { CitaCrearProps } from '../types/citas';
import { UUID } from '../types/types';
import { validarCita, validarCitaEditar } from '../utils/Validaciones/Citas';

export class CitasController {

    static async getAll(_req: Request, res: Response) {
        try {
            const { success, message, citas } = await ModeloCita.getAll();

            if (success) {
                res.status(200).json({ success, message, citas });
            } else {
                res.status(500).json({ success, message, citas: [] });
            }
        } catch (error) {
            res.status(500).json({ success: false, message: 'Error al obtener las citas' });
        }
    }

    static async createCita(req: Request, res: Response) {

        const resultDataCrearCita = validarCita(req.body);

        if (resultDataCrearCita.error) {
            res.status(400).json({ success: false, message: JSON.parse(resultDataCrearCita.error.message) });
            return;
        }

        const dataCrearCita = resultDataCrearCita.data as CitaCrearProps

        const { success, message, cita } = await ModeloCita.createCita(dataCrearCita);

        if (success) {
            res.status(200).json({ success, message, cita });
        } else {
            res.status(500).json({ success, message, cita: {} });
        }
    }

    static async deleteCita(req: Request, res: Response) {

        const resultDataIdEliminarCita = validarId(req.params as { id: UUID });

        if (resultDataIdEliminarCita.error) {
            res.status(400).json({ success: false, message: resultDataIdEliminarCita.error.message, cita: {} });
            return;
        }

        const idCitaEliminar = resultDataIdEliminarCita.data.id as UUID;

        const { success, message, cita } = await ModeloCita.deleteCita(idCitaEliminar);

        if (success) {
            res.status(200).json({ success, message, cita });
        } else {
            res.status(500).json({ success, message, cita: {} });
        }
    }

    static async updateCita(req: Request, res: Response) {
        const resultDataModificarCita = validarCitaEditar(req.body);

        if (resultDataModificarCita.error) {
            res.status(400).json({ success: false, message: JSON.parse(resultDataModificarCita.error.message) });
            return;
        }

        const resultDataIdModificarCita = validarId(req.params as { id: UUID });

        if (resultDataIdModificarCita.error) {
            res.status(400).json({ success: false, message: resultDataIdModificarCita.error.message });
            return;
        }

        const idCitaModificar = resultDataIdModificarCita.data.id as UUID;
        const dataModificarCita = resultDataModificarCita.data.completado;

        const { success, message, cita } = await ModeloCita.updateCita({ id: idCitaModificar, completado: dataModificarCita });

        if (success) {
            res.status(200).json({ success, message, cita });
        } else {
            res.status(500).json({ success, message, cita: {} });
        }
    }


    static async updateCitaAceptada(req: Request, res: Response) {
        const resultDataIdAceptada = validarId(req.params as { id: UUID });

        if (resultDataIdAceptada.error) {
            res.status(400).json({ success: false, message: resultDataIdAceptada.error.message, cita: {} });
            return;
        }

        const idCitaAceptada = resultDataIdAceptada.data.id as UUID;

        const { success, message, cita } = await ModeloCita.updateCitaAceptada({ id: idCitaAceptada });

        if (success) {
            res.status(200).json({ success, message, cita });
        } else {
            res.status(500).json({ success, message, cita: {} });
        }
    }
}