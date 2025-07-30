import { ModeloSocial } from '../models/MySQL/social';
import { UUID } from '../types/types';
import { validarId } from '../utils/Validacion';
import { validarSocialEditar } from '../utils/Validaciones/Sociales';
import { Request, Response } from 'express';

export class ContrallerSocial {
    static async getAll(_req: Request, res: Response) {
        try {
            const { success, message, redesSociales } = await ModeloSocial.getAll();

            if (success) {
                res.status(200).json({ success, message, redesSociales });
            } else {
                res.status(500).json({ success, message, redesSociales: [] });
            }
        } catch (error) {
            res.status(500).json({ message: 'Ocurrio un error interno del servidor' });
        }
    }

    static async updateSocial(req: Request, res: Response) {

        const resultDataReferenciaSocial = validarSocialEditar(req.body);

        if (resultDataReferenciaSocial.error) {
            res.status(400).json({ success: false, message: resultDataReferenciaSocial.error.message });
            return;
        }

        const resultDataIdModificarSocial = validarId(req.params as { id: UUID });
        if (resultDataIdModificarSocial.error) {
            res.status(400).json({ success: false, message: resultDataIdModificarSocial.error.message });
            return;
        }

        const idSocialModificar = resultDataIdModificarSocial.data.id as UUID;
        const referencia = resultDataReferenciaSocial.data.referencia;

        const { success, message, redSocial } = await ModeloSocial.updateSocial({ id: idSocialModificar, referencia });

        if (success) {
            res.status(200).json({ success, message, redSocial });
        } else {
            res.status(500).json({ success, message, redSocial: {} });
        }
    }

}
