import { Request, Response } from 'express';
import { ModeloEspecialista } from '../models/MySQL/especialista';
import { validarId } from '../utils/Validacion';
import { validarEspecialista, validarEspecialistaEditar } from '../utils/Validaciones/Especialista';
import { EspecialistaCrearProps, EspecialistaProps } from '../types/especialista';
import { UUID } from '../types/types';

export class ControllerEspecialistas {
    static async getAll(_req: Request, res: Response) {
        try {
            const { success, message, especialistas } = await ModeloEspecialista.getAll();

            if (success) {
                res.status(200).json({ success, message, especialistas });
            } else {
                res.status(500).json({ success, message, especialistas });
            }
        } catch (error) {
            res.status(500).json({ message: 'Ocurrio un error interno del servidor' });
        }
    }



    static async createEspecialista(req: Request, res: Response) {

        const resultDataEspecialista = validarEspecialista(req.body);

        if (resultDataEspecialista.error) {
            res.status(400).json({ success: false, message: JSON.parse(resultDataEspecialista.error.message) });
            return;
        }

        const dataEspecialista = resultDataEspecialista.data as EspecialistaProps;

        const { success, message, especialista } = await ModeloEspecialista.createEspecialista({ dataEspecialista });

        if (success) {
            res.status(200).json({ success, message, especialista });
        } else {
            res.status(500).json({ success, message, especialista: {} });
        }
    }



    static async updateEspecialista(req: Request, res: Response) {
        const resultDataIdModificarEspecialista = validarId(req.params as { id: UUID });
        const resultDataModificarEspecialista = validarEspecialistaEditar(req.body);

        if (resultDataIdModificarEspecialista.error) {
            res.status(400).json({ success: false, message: resultDataIdModificarEspecialista.error.message });
            return;
        }

        const idEspecialistaModificar = resultDataIdModificarEspecialista.data.id as UUID;
        const dataModificarEspecialista = resultDataModificarEspecialista.data as EspecialistaCrearProps;

        const { success, message, especialista } = await ModeloEspecialista.updateEspecialista({ id: idEspecialistaModificar, dataEspecialista: dataModificarEspecialista });

        if (success) {
            res.status(200).json({ success, message, especialista });
        } else {
            res.status(500).json({ success, message, especialista });
        }
    }

    static async deleteEspecialista(req: Request, res: Response) {

        const resultDataIdEliminarEspecialista = validarId(req.params as { id: UUID });

        if (resultDataIdEliminarEspecialista.error) {
            res.status(400).json({ success: false, message: resultDataIdEliminarEspecialista.error.message });
            return;
        }
        const idEspecialistaEliminar = resultDataIdEliminarEspecialista.data.id as UUID;

        const { success, message, especialista } = await ModeloEspecialista.deleteEspecialista({ id: idEspecialistaEliminar });

        if (success) {
            res.status(200).json({ success, message, especialista });
        } else {
            res.status(500).json({ success, message, especialista });
        }
    }
}